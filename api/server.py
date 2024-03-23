import json
from flask import Flask
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)
HOST = open("db_ip_addr").read().rstrip()
PORT = "5432"

@app.route('/')
def index():
    return json.dumps({'msg': "success"})

@app.route('/inventory')
def inventory():
    with psycopg2.connect(
    host=HOST,
    port=PORT, # whatever port postgres is running on
    database="rental_db",
    user="postgres",
    password="password") as conn:
        with conn.cursor() as cursor:
            cursor.execute("select * from Rentals")
            rentals = cursor.fetchall()
    conn.close()
    return json.dumps({'rentals': rentals if rentals else "No response..."})

@app.route('/customers')
def customers():
    with psycopg2.connect(
    host=HOST,
    port=PORT, # whatever port postgres is running on
    database="rental_db",
    user="postgres",
    password="password") as conn:
        with conn.cursor() as cursor:
            cursor.execute("select Customer.id, Customer.first_name, Customer.last_name, AccountType.acct_type from Customer join AccountType on Customer.account_type = AccountType.id")
            customers = cursor.fetchall()
    conn.close()
    return json.dumps({'customers': customers if customers else "No response..."})

@app.route('/customers/<id>')
def single_customer_rentals(id):
    with psycopg2.connect(
    host=HOST,
    port=PORT,   # whatever port postgres is running on
    database="rental_db",
    user="postgres",
    password="password") as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT title FROM Rentals JOIN  CustomerRentals ON Rentals.id = rental_id JOIN Customer ON customer_id = Customer.id WHERE Customer.id = (%s)", (id,))
            rentals = cursor.fetchall()
    conn.close()
    return json.dumps({'rentals': rentals if rentals else "That person doesn't exist"})


app.run(host='0.0.0.0', port=8000, debug=True)