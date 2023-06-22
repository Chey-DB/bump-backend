from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bs import formatted_quotes
import ssl

load_dotenv()

client = MongoClient(os.getenv("DB_CONNECTION"), ssl=True, ssl_cert_reqs=ssl.CERT_NONE)
  # if your mongodb is running locally on default port

db = client['Cluster0']  # replace 'my_database' with your database name

# now you can use `db` object to interact with your database. For example, to find all documents in 'my_collection':
collection = db['quotes']  # replace 'my_collection' with your collection name

formatted_quotes_dict = {"quotes": formatted_quotes}
collection.insert_one(formatted_quotes_dict)


