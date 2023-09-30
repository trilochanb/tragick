from faker import Faker
import uuid
import random
import psycopg2
from psycopg2 import sql

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

# List of food names
food_names = [
    "Pizza",
    "Burger",
    "Pasta",
    "Sushi",
    "Salad",
    "Steak",
    "Tacos",
    "Ice Cream",
    "Chicken Curry",
    "Fried Rice"
]

# Get the list of vendor IDs
cur.execute("SELECT id FROM accounts_vendor")
vendor_ids = [row[0] for row in cur.fetchall()]

# Generate random products for each vendor
for vendor_id in vendor_ids:
    num_products = random.randint(0, 10)
    
    for _ in range(num_products):
        product_id = str(uuid.uuid4())[:32]
        name = random.choice(food_names)  # Randomly select a food name
        created_at = fake.date_time_this_decade()

        # Insert data into the table
        insert_query = sql.SQL("INSERT INTO products_product (id, name, created_at, owner_id) VALUES ({}, {}, {}, {});").format(
            sql.Literal(product_id),
            sql.Literal(name),
            sql.Literal(created_at),
            sql.Literal(vendor_id)
        )
        cur.execute(insert_query)

# Commit changes and close connection
conn.commit()
cur.close()
conn.close()

