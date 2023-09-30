import psycopg2
import uuid
from faker import Faker

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname="supplychain",
    user="postgres",
    password="admin",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Create an instance of Faker
fake = Faker()

# Get the list of batch IDs
cur.execute("SELECT id FROM products_productbatch")
batch_ids = [row[0] for row in cur.fetchall()]

# Generate random product instances (one for each batch)
for batch_id in batch_ids:
    instance_id = str(uuid.uuid4())[:32]

    # Generate created_at for the instance
    created_at_instance = fake.date_time_this_decade(before_now=False)

    # Insert data into the table
    cur.execute(
        "INSERT INTO products_productinstance (id, created_at, batch_id) VALUES (%s, %s, %s);",
        (instance_id, created_at_instance, batch_id)
    )

# Commit changes and close connection
conn.commit()
cur.close()
conn.close()

