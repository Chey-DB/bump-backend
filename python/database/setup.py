from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("DB_CONNECTION"))  # if your mongodb is running locally on default port

db = client['Cluster0']  # replace 'my_database' with your database name

# now you can use `db` object to interact with your database. For example, to find all documents in 'my_collection':
collection = db['quotes']  # replace 'my_collection' with your collection name
documents = collection.find()

for doc in documents:
    print(doc)
