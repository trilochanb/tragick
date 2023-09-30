import streamlit as st
import pandas as pd
import psycopg2
from datetime import datetime
import plotly.express as px
def render_heatmap():
    
conn = psycopg2.connect(
        database="supplychain",
        user="database",
        password="admin",
        host="localhost",
        port="5432"
        )


st.title("Vendor Sales Heatmap")


dates_query = """
SELECT DISTINCT date_trunc('day', created_at) as date
FROM public.products_acknowledgement;
"""

dates_df = pd.read_sql(dates_query, conn)
dates_list = dates_df['date'].dt.date.tolist()


selected_date = st.selectbox("Select a Date", dates_list)


start_date = datetime.combine(selected_date, datetime.min.time())
end_date = datetime.combine(selected_date, datetime.max.time())


query_heatmap = """
SELECT av.id as vendor_id, av.location_lat, av.location_long, COALESCE(SUM(ppb.quantity), 0) as quantity
FROM public.accounts_vendor av
LEFT JOIN public.products_product pp ON av.id = pp.owner_id
LEFT JOIN public.products_productbatch ppb ON pp.id = ppb.product_id
LEFT JOIN public.products_productinstance ppi ON ppb.id = ppi.batch_id
LEFT JOIN public.products_acknowledgement pa ON ppi.id = pa.instance_id
WHERE date_trunc('day', pa.created_at) = date_trunc('day', %(selected_date)s)
GROUP BY av.id, av.location_lat, av.location_long;
"""

data = {'selected_date': selected_date}
df_heatmap = pd.read_sql(query_heatmap, conn, params=data)


fig = px.density_mapbox(df_heatmap, lat='location_lat', lon='location_long', z='quantity',
                        radius=10, center=dict(lat=27.7172, lon=85.3240),  
                        zoom=10, mapbox_style="open-street-map",
                        title=f"Vendor Sales Heatmap for {selected_date}",
                        color_continuous_scale=px.colors.sequential.Blues_r,  
                        hover_data={'vendor_id': True, 'location_lat': True, 'location_long': True, 'quantity': True})


st.layout("wide")


st.plotly_chart(fig, use_container_width=True)

