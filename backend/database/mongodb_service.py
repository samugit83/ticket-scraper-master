import pymongo
from pymongo.errors import PyMongoError
import logging
from bson import ObjectId
import time
import re

# Example of using the logger
logger = logging.getLogger(__name__)


def add_new_tracked_ticket(ticket_data):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["trackedTickets"]

        result = collection.insert_one(ticket_data)

        if result.inserted_id:
            return True
        else:
            return False
        
    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return False
    finally:
        client.close()


def switch_tracked_ticket(_id, switch_status):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["trackedTickets"]

        result = collection.update_one(
            {"_id": ObjectId(_id)},  
            {"$set": {"isActive": switch_status}}  
        )

        if result.matched_count > 0:
            return True  
        else:
            return False  

    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return False
    finally:
        client.close()



def update_ticket_found(_id):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["trackedTickets"]

        current_time_millis = int(time.time() * 1000)

        result = collection.update_one(
            {"_id": ObjectId(_id)}, 
            {"$set": {
                "isActive": False, 
                "lastNotificationTime": current_time_millis  
            }}
        )
        if result.matched_count > 0:
            return True  
        else:
            return False  
    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return False
    finally:
        client.close()



def update_contact_list(contact_list_data):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["trackedTickets"]

        contact_type = contact_list_data["contactType"]
        contact_string = contact_list_data["contactString"]
        
        contact_array = list(set([item.strip() for item in re.split(r'[,;\s\n]+', contact_string) if item.strip()]))
        
        update_field = "emailList" if contact_type == "email" else "phoneList"
        
        result = collection.update_one(
            {"_id": ObjectId(contact_list_data["_id"])},
            {"$set": {update_field: contact_array}}
        )

        if result.matched_count > 0:
            return True
        else:
            return False

    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return False
    finally:
        client.close()

        
def update_parameter(parameter_name, parameter_value):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["parameters"]

        result = collection.update_one(
            {"parameter_name": parameter_name},
            {"$set": {"parameter_value": parameter_value}},
            upsert=True
        )

        if result.matched_count > 0 or result.upserted_id:
            return True
        else:
            return False
        
    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return False
    finally:
        client.close()


def get_parameter(parameter_name):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["parameters"]
        
        result = collection.find_one({"parameter_name": parameter_name})

        all_elements = list(collection.find())
        logger.info(f"All elements in the collection: {all_elements}")

        
        if result:
            return result["parameter_value"]
        else:
            return None
        
    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return None
    finally:
        client.close()


def delete_tracked_ticket(_id):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["trackedTickets"]

        result = collection.delete_one({"_id": ObjectId(_id)})  

        if result.deleted_count > 0:
            return True 
        else:
            return False  

    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return False
    finally:
        client.close()




def get_user_data(user_name):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["tScrapDb"]
        collection = db["trackedTickets"]

        result = collection.find({"userName": user_name})

        user_data = {
            'userName': user_name,
            'trackedTickets': []
        }

        for doc in result:
            doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
            user_data['trackedTickets'].append(doc)

        return user_data
        
    except PyMongoError as e:
        logger.info(f"An error occurred: {e}")
        return None
    finally:
        client.close()



def get_active_tracked_tickets():
    try:
        with pymongo.MongoClient("mongodb://localhost:27017/") as client:
            db = client["tScrapDb"]
            collection = db["trackedTickets"]

            result = collection.find({"isActive": True})
            result_array = [{**doc, '_id': str(doc['_id'])} for doc in result]

            return result_array

    except PyMongoError as e:
        logger.error(f"An error occurred while fetching get_active_tracked_tickets: {e}")
        return None
    


