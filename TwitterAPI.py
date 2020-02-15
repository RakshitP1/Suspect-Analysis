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


client=MongoClient()
db=client.tweet_db
tweet_collection=db.tweet_collection
tweet_collection.create_index([("id",pymongo.ASCENDING)],unique=True)



name = "NihalPotdar"
tweetCount = 10


results = api.user_timeline(id=name, count=tweetCount)

search_results = {}

for tweet in results:
   if name not in search_results:
       search_results[name] = []
   if tweet.text not in search_results[name]:
       search_results[name].append(tweet.text)   



try:
    tweet_collection.insert(search_results)
except:
    pass
              
tweet_cursor = tweet_collection.find()

for document in tweet_cursor:
   for i in range(len(search_results[name])):
      if(name in document):
         print('-----')
         print('name:-',name)
         print('text:-',document[name][i])