import streamlit as st
import psycopg2


st.set_page_config(page_title="Supply Chain App", layout="wide")


with st.spinner("Loading..."):
    
    conn = psycopg2.connect(
        dbname='supplychain',
        user='database',
        password='admin',
        host='localhost',
        port='5432'
    )

    
    cursor = conn.cursor()

    
    def fetch_recent_transactions():
        cursor.execute("""
            SELECT pa.id, pa.created_at, pa.instance_id, pa.vendor_id, p.name AS product_name, pi.created_at AS instance_created_at
            FROM products_acknowledgement pa
            INNER JOIN products_productinstance pi ON pa.instance_id = pi.id
            INNER JOIN products_productbatch pb ON pi.batch_id = pb.id
            INNER JOIN products_product p ON pb.product_id = p.id
            ORDER BY pa.created_at DESC
            LIMIT 10
        """)
        transactions = cursor.fetchall()
        return transactions

    
    def display_recent_transactions():
        st.header("Recent Transactions")
        transactions = fetch_recent_transactions()
        for transaction in transactions:
            st.write(f"Transaction ID: {transaction[0]}, Product: {transaction[4]}, Instance ID: {transaction[2]}, Vendor ID: {transaction[3]}, Created At: {transaction[1]}, Instance Created At: {transaction[5]}")

    
    display_recent_transactions()

    
    conn.close()

