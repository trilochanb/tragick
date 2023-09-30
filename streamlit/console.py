import streamlit as st
import psycopg2
import toml


secrets = toml.load(".streamlit/secrets.toml")
db_config = secrets["database"]


conn_params = {
    'dbname': db_config['dbname'],
    'user': db_config['dbuser'],
    'password': db_config['dbpassword'],
    'host': db_config['dbhost'],
    'port': db_config['dbport']
}


conn = psycopg2.connect(**conn_params)
cur = conn.cursor()


st.title("Database Read Operations")


query = st.text_area("Enter your SQL query:")


for keyword in ['DELETE', 'UPDATE', 'INSERT', 'ALTER', 'DROP']:
    if keyword in query.upper():
        st.error(f"Error: Unsafe query! The keyword '{keyword}' is not allowed.")
        st.stop()


if st.button("Execute Query"):
    try:
        cur.execute(query)
        result = cur.fetchall()
        st.write("Query executed successfully!")
        st.write("Results:")
        st.write(result)
    except Exception as e:
        st.error(f"Error executing query: {e}")


conn.close()

