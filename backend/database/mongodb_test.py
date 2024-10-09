import pymongo

# Connect to the MongoDB server
client = pymongo.MongoClient("mongodb://localhost:27017/")

# Connect to the database and collection
db = client["tScrapDb"]
collection = db["trackedTickets"]



# Find all documents with the specified event name
result = collection.find()

# Iterate over the cursor and print each document
print("Documents found:")
for doc in result:
    print(doc)

# Close the connection
client.close()


#collection.delete_many({})