import psycopg2
import uuid
from faker import Faker

conn = psycopg2.connect(
    dbname="supplychain",
    user="postgres",
    password="admin",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

fake = Faker()

cur.execute("SELECT id FROM products_productinstance")
instance_ids = [row[0] for row in cur.fetchall()]

cur.execute("SELECT id FROM accounts_vendor")
vendor_ids = [row[0] for row in cur.fetchall()]

# Calculate the number of acknowledgements needed (7% of instance_ids ps. I chose it randomly)
num_acknowledgements = int(0.07 * len(instance_ids))

# Generate random acknowledgements so that some products travel more than one hands in the supply chain ... 
for _ in range(num_acknowledgements):
    acknowledgement_id = str(uuid.uuid4())[:32]
    instance_id = fake.random_element(elements=instance_ids)
    vendor_id = fake.random_element(elements=vendor_ids)
    created_at = fake.date_time_this_decade()

    # Insert data into the table
    cur.execute(
        "INSERT INTO products_acknowledgement (id, created_at, instance_id, vendor_id) VALUES (%s, %s, %s, %s);",
        (acknowledgement_id, created_at, instance_id, vendor_id)
    )

conn.commit()
cur.close()
conn.close()

