import pymongo
from pymongo import MongoClient
import tweepy
from pprint import pprint

#authentication keys
CONSUMER_KEY="Gu73BTDiz3grPM1aCfxqLPAP9"
CONSUMER_SECRET="oYyN16dKgPp5YHZ2USJPqWJpBNCFcl8Fsrc7QynMVcG5kbc1q9"
OAUTH_TOKEN="1228614243219582976-qRcxliWcrChAWAV0Atg4XTvyqeBzNa"
OAUTH_TOKEN_SECRET="wvcd5MQz074Q9ONho1FRejwFLYtXqJBYaDAFFF5GtWiiQ"

# Creating the authentication object
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
# Setting your access token and secret
auth.set_access_token(OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
# Creating the API object while passing in auth information
api = tweepy.API(auth) 


#mongo client
client = MongoClient("mongodb+srv://test:Test123@cluster0-6occj.gcp.mongodb.net/test?retryWrites=true&w=majority")

#get the database
Users = client.get_database('Twitter_Users')

#get the collection 
feeds = Users.Twitter_Feeds

#feeds.create_index([("id",pymongo.ASCENDING)],unique=True)

name = "NihalPotdar"
tweetCount = 10

# collection of last 10 tweets
results = api.user_timeline(id=name, count=tweetCount)

search_results = {}

#iterating through all the tweets
for tweet in results:
   if name not in search_results:
       search_results[name] = []
   if tweet.text not in search_results[name]:
       search_results[name].append(tweet.text)   

try:
    feeds.insert(search_results)
except:
    pass
              
tweet_cursor = feeds.find()

for document in tweet_cursor:
   for i in range(len(search_results[name])):
      if(name in document):
         print('-----')
         print('name:-',name)
         print('text:-',document[name][i])