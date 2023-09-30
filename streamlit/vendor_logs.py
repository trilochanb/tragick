import streamlit as st
import psycopg2
import pandas as pd
import base64


conn = psycopg2.connect(database="supplychain", user="database", password="admin", host="localhost", port="5432")
cur = conn.cursor()


st.set_page_config(layout="wide")


st.title("Vendor Details")


cur.execute("SELECT id FROM public.accounts_vendor")
vendor_ids = [row[0] for row in cur.fetchall()]


selected_vendor_id = st.selectbox("Select Vendor ID:", vendor_ids)


cur.execute("""
    SELECT av.id, av.first_name, av.last_name, av.vendor_name, av.location_lat, av.location_long,
           pp.id, pp.name, pp.created_at, pp.owner_id,
           ppb.id, ppb.quantity, ppb.product_id,
           ppi.id, ppi.created_at, ppi.batch_id,
           pa.id, pa.created_at, pa.instance_id, pa.vendor_id
    FROM public.accounts_vendor av
    JOIN public.products_product pp ON av.id = pp.owner_id
    JOIN public.products_productbatch ppb ON pp.id = ppb.product_id
    JOIN public.products_productinstance ppi ON ppb.id = ppi.batch_id
    JOIN public.products_acknowledgement pa ON ppi.id = pa.instance_id
    WHERE av.id=%s
    ORDER BY pa.created_at ASC
""", (selected_vendor_id,))
vendor_data = cur.fetchall()


if vendor_data:
    st.write(f"Vendor ID: {vendor_data[0][0]}")  
    st.write(f"First Name: {vendor_data[0][1]}")
    st.write(f"Last Name: {vendor_data[0][2]}")
    st.write(f"Vendor Name: {vendor_data[0][3]}")
    st.write(f"Latitude: {vendor_data[0][4]}")
    st.write(f"Longitude: {vendor_data[0][5]}")

    
    df = pd.DataFrame(vendor_data, columns=[
        'Vendor_ID', 'First_Name', 'Last_Name', 'Vendor_Name', 'Latitude', 'Longitude',
        'Product_ID', 'Product_Name', 'Product_Created_At', 'Owner_ID',
        'Batch_ID', 'Quantity', 'Product_ID_2',
        'Instance_ID', 'Instance_Created_At', 'Batch_ID_2',
        'Acknowledgement_ID', 'Acknowledgement_Created_At', 'Instance_ID_2', 'Vendor_ID_2'
    ])
    
    
    st.dataframe(df)
else:
    st.write("Vendor ID not found")


if vendor_data:
    csv_data = df.to_csv(index=False)
    b64_csv = base64.b64encode(csv_data.encode()).decode()
    st.markdown(f'<a href="data:file/csv;base64,{b64_csv}" download="vendor_details.csv">Download CSV</a>', unsafe_allow_html=True)

    json_data = df.to_json(orient='records')
    b64_json = base64.b64encode(json_data.encode()).decode()
    st.markdown(f'<a href="data:file/json;base64,{b64_json}" download="vendor_details.json">Download JSON</a>', unsafe_allow_html=True)


cur.close()
conn.close()

