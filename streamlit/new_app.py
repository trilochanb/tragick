import streamlit as st
import os
import pandas as pd
import folium
from streamlit_folium import folium_static
import psycopg2
import plotly.graph_objects as go





st.set_page_config(page_title="Supply Chain App", layout="wide")


@st.cache_data
def load_data():
    import psycopg2

    conn = psycopg2.connect(
        dbname='supplychain',
        user='database',
        password='admin',
        host='localhost',
        port='5432'
    )
    query = "SELECT location_lat, location_long FROM public.accounts_vendor;"
    df = pd.read_sql_query(query, conn)
    conn.close()

    return df


df = load_data()


map_data = pd.DataFrame({'LATITUDE': df['location_lat'], 'LONGITUDE': df['location_long']})


st.title("Vendor Locations Map")



st.sidebar.header("Sidebar Options")


def call_bulletin_updates():
    os.system("streamlit run bulletin_updates.py")

def call_vendor_logs():
    os.system("streamlit run vendor_logs.py")

def call_search():
    os.system("streamlit run search.py")

def call_console():
    os.system("streamlit run console.py")



if st.sidebar.button("Bulletin and Updates", key="bulletin"):
    call_bulletin_updates()









if st.sidebar.button("Vendor Logs", key="logs"):
    call_vendor_logs()


if st.sidebar.button("Search", key="search"):
    call_search()


if st.sidebar.button("Console", key="console"):
    call_console()


st.map(map_data)



def get_vendor_data(vendor_name, start_date, end_date):
    conn = psycopg2.connect(
        dbname='supplychain',
        user='database',
        password='admin',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()

    cur.execute(f"""
        SELECT
            v.vendor_name,
            COUNT(pb.quantity) as product_count,
            COUNT(DISTINCT a.id) as acknowledgement_count
        FROM
            public.accounts_vendor v
        LEFT JOIN
            public.products_product p ON v.id = p.owner_id
        LEFT JOIN
            public.products_productbatch pb ON p.id = pb.product_id
        LEFT JOIN
            public.products_productinstance pi ON pb.id = pi.batch_id
        LEFT JOIN
            public.products_acknowledgement a ON pi.id = a.instance_id
        WHERE
            v.vendor_name = '{vendor_name}'
            AND pi.created_at >= '{start_date}'::timestamp
            AND pi.created_at <= '{end_date}'::timestamp
        GROUP BY
            v.vendor_name
    """)

    data = cur.fetchone()
    
    cur.close()
    conn.close()

    return data


def get_vendor_location(vendor_name):
    conn = psycopg2.connect(
        dbname='supplychain',
        user='database',
        password='admin',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()

    cur.execute(f"""
        SELECT
            v.vendor_name,
            v.location_lat,
            v.location_long
        FROM
            public.accounts_vendor v
        WHERE
            v.vendor_name = '{vendor_name}'
    """)

    data = cur.fetchone()
    
    cur.close()
    conn.close()

    return data


def get_heatmap_data(start_date, end_date):
    conn = psycopg2.connect(
        dbname='supplychain',
        user='database',
        password='admin',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()

    cur.execute(f"""
        SELECT
            v.location_lat,
            v.location_long,
            COUNT(pb.quantity) as product_count
        FROM
            public.accounts_vendor v
        LEFT JOIN
            public.products_product p ON v.id = p.owner_id
        LEFT JOIN
            public.products_productbatch pb ON p.id = pb.product_id
        LEFT JOIN
            public.products_productinstance pi ON pb.id = pi.batch_id
        WHERE
            pi.created_at >= '{start_date}'::timestamp
            AND pi.created_at <= '{end_date}'::timestamp
        GROUP BY
            v.location_lat, v.location_long
    """)

    data = cur.fetchall()
    
    cur.close()
    conn.close()

    return data


conn = psycopg2.connect(
    dbname='supplychain',
    user='database',
    password='admin',
    host='localhost',
    port='5432'
)

cur = conn.cursor()


cur.execute("SELECT vendor_name FROM public.accounts_vendor")
vendors = [vendor[0] for vendor in cur.fetchall()]


st.title("Vendor Comparison App")


selected_vendors = st.multiselect("Select Vendors", vendors)


start_date = st.date_input("Start Date")
end_date = st.date_input("End Date")

if not selected_vendors:
    st.warning("Please select at least one vendor.")
elif not start_date or not end_date:
    st.warning("Please provide both start and end dates.")
else:
    
    vendor_data = []

    for vendor in selected_vendors:
        data = get_vendor_data(vendor, start_date, end_date)
        if data:
            vendor_data.append(data)

    
    if vendor_data:
        for data in vendor_data:
            st.subheader(f"Vendor: {data[0]}")
            st.write(f"Product Count: {data[1]}")
            st.write(f"Acknowledgement Count: {data[2]}")

            
            location_data = get_vendor_location(data[0])

            
            m = folium.Map(location=[location_data[1], location_data[2]], zoom_start=15)

            
            folium.Marker(
                location=[location_data[1], location_data[2]],
                popup=f"Vendor: {data[0]}",
                tooltip="Click for details",
            ).add_to(m)

            
            heatmap_data = get_heatmap_data(start_date, end_date)

            
            heatmap = folium.plugins.HeatMap(
                heatmap_data,
                min_opacity=0.2,
                radius=15,
                blur=10,
                max_zoom=1,
            )

            heatmap.add_to(m)

            
            folium_static(m)
    else:
        st.warning("No data found for the selected vendors.")


cur.close()
conn.close()




conn = psycopg2.connect(database="supplychain", user="database", password="admin", host="localhost", port="5432")
cur = conn.cursor()

def create_hover_info(coordinates):
    hover_info = []  
    
    for i, coord in enumerate(coordinates, start=1):
        vendor_name, timestamp, transactions = coord[0], coord[3], i
        hover_info.append(f"{i}. Vendor: {vendor_name}, Transactions: {transactions}")
    
    return hover_info

def draw_map(coordinates, hover_info):
    fig = go.Figure(go.Scattermapbox(
        lat=[coord[1] for coord in coordinates],
        lon=[coord[2] for coord in coordinates],
        mode='markers+lines',
        marker=dict(size=9),
        text=hover_info,  
    ))

    
    for i, coord in enumerate(coordinates, start=1):
        fig.add_trace(go.Scattermapbox(
            lat=[coord[1]],
            lon=[coord[2]],
            mode='text',
            text=str(i),
            textfont=dict(size=12, color='black'),
            showlegend=False,
        ))

    fig.update_layout(
        mapbox=dict(
            style='open-street-map',
            center=dict(lat=coordinates[0][1], lon=coordinates[0][2]),  
            zoom=10,
        )
    )

    return fig




st.title("Product Batch Tracking")


cur.execute("SELECT DISTINCT product_id FROM public.products_productbatch")
batches = cur.fetchall()


selected_batch = st.selectbox("Select a product batch:", [str(batch[0]) for batch in batches])


if st.button("Track"):
    
    cur.execute("SELECT id FROM public.products_productbatch WHERE product_id=%s", (selected_batch,))
    batches = cur.fetchall()
    
    route_coordinates = []  
    
    for batch in batches:
        batch_id = batch[0]
        
        
        cur.execute("SELECT id FROM public.products_productinstance WHERE batch_id=%s", (batch_id,))
        instances = cur.fetchall()
        
        for instance in instances:
            instance_id = instance[0]
            
            
            cur.execute("SELECT id, vendor_id, created_at FROM public.products_acknowledgement WHERE instance_id=%s ORDER BY created_at ASC", (instance_id,))
            acks = cur.fetchall()
            
            for ack in acks:
                ack_id = ack[0]
                vendor_id = ack[1]
                timestamp = ack[2]  
                
                
                cur.execute("SELECT vendor_name, location_lat, location_long FROM public.accounts_vendor WHERE id=%s", (vendor_id,))
                vendor_info = cur.fetchone()
                
                if vendor_info:
                    vendor_name, location_lat, location_long = vendor_info
                    route_coordinates.append((vendor_name, location_lat, location_long, timestamp))

    if route_coordinates:
        hover_info = create_hover_info(route_coordinates)
        st.plotly_chart(draw_map(route_coordinates, hover_info), use_container_width=True)  

        
        hover_info.sort(key=lambda x: int(x.split(".")[0]))
        st.header("Hover Information (Ascending Order):")
        st.markdown("\n".join(hover_info))


cur.close()
conn.close()

