import psycopg2
import uuid
import random

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname="supplychain",
    user="postgres",
    password="admin",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Get the list of product IDs
cur.execute("SELECT id FROM products_product")
product_ids = [row[0] for row in cur.fetchall()]

# Generate random product batches
for product_id in product_ids:
    num_entries = random.randint(1, 100)

    for _ in range(num_entries):
        batch_id = str(uuid.uuid4())[:32]
        quantity = random.randint(100, 1000)

        # Insert data into the table
        cur.execute(
            "INSERT INTO products_productbatch (id, quantity, product_id) VALUES (%s, %s, %s);",
            (batch_id, quantity, product_id)
        )

# Commit changes and close connection
conn.commit()
cur.close()
conn.close()

