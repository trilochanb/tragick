import streamlit as st
import psycopg2
import csv
import json


conn = psycopg2.connect(database="supplychain", user="database", password="admin", host="localhost", port="5432")
cur = conn.cursor()


st.set_page_config(layout="wide")


st.title("Search Database")


tables = [
    'accounts_vendor',
    'products_product',
    'products_productbatch',
    'products_productinstance',
    'products_acknowledgement'
]


search_term = st.text_input("Enter search term:")


results = []


with st.spinner("Searching..."):
    for table in tables:
        cur.execute(f"SELECT * FROM {table}")
        rows = cur.fetchall()

        
        matching_rows = [row for row in rows if any(str(search_term).lower() in str(cell).lower() for cell in row)]

        if table == 'accounts_vendor':
            
            matching_rows = [tuple(cell for i, cell in enumerate(row) if i not in (0, 2, 3, 4, 8)) for row in matching_rows]

        results.extend(matching_rows)


if results:
    st.markdown(f"
    st.markdown("| Table | Result |")
    st.markdown("| --- | --- |")
    for row in results:
        st.markdown(f"| {' | '.join(map(str, row))} |")
else:
    st.markdown("


if st.button("Export as CSV"):
    csv_data = [','.join(map(str, row)) for row in results]
    csv_data = '\n'.join(csv_data)
    with open('search_results.csv', 'w') as file:
        file.write(csv_data)
    st.markdown("


if st.button("Export as JSON"):
    json_data = json.dumps(results, indent=4)
    with open('search_results.json', 'w') as file:
        file.write(json_data)
    st.markdown("


cur.close()
conn.close()

