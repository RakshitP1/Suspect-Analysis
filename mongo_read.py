from pymongo import MongoClient

#mongo client
client = MongoClient("mongodb+srv://test:Test123@cluster0-6occj.gcp.mongodb.net/test?retryWrites=true&w=majority")

#get the database
Users = client.get_database('Twitter_Users')

#get the collection 
feeds = Users.Twitter_Feeds

#finding the number of initial documents
print("original number of feeds:" + str(feeds.count_documents({})) )

new_feed = {
    'name':'Bob',
    'message': 'Hello World!'
}

#adding a new document 
feeds.insert_one(new_feed)

#finding the number of new documents
print("new number of feeds:" + str(feeds.count_documents({})) )

