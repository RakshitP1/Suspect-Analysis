import pymongo
from pymongo import MongoClient
import tweepy
import app
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

#not needed but aim is to sort in ascending order
# feeds.create_index([("id",pymongo.ASCENDING)],unique=True) 
f=open("name.txt", "r")
name = f.read()
f.close()

t=open("handle.txt", "r")
handle = t.read()
t.close()


# twitter handle is more accurate than name

#list of current account info
tweets = feeds.find_one({"name":name})
#print(len(tweets[name]))

#find total number of tweets

user = api.get_user(name)
total_tweets = api.get_user(name).statuses_count
#print(total_tweets)

# find if current id exists in database to update curr_num of tweets
fail_safe = feeds.count_documents({"name": name})
#print(fail_safe)

curr_tweets = len(tweets[name]) if fail_safe != 0 else 0
#print(curr_tweets)

#find number of new tweets
tweetCount = total_tweets-curr_tweets

# collection of new tweets
results = api.user_timeline(id=name, count=tweetCount)

search_results = {'name':name}

#adding tweet results
for tweet in results:
   if  name not in search_results:
       search_results[name] = []
   if tweet.text not in search_results[name]:
       search_results[name].append(tweet.text) 

if fail_safe != 0: #already exists
    for i in range(curr_tweets):
        search_results[name].append(tweets[name][i])

#print(search_results)
z = open("tweetsList.txt", "w+")
for i in range(len(search_results[name])):
    for character in search_results[name][i]:
        if (character >= ' ' and character <= 'z'):
            z.write(character)

z.close()

if fail_safe != 0: #already exists in database
    feeds.delete_many({"name": name})

try:
    feeds.insert_one(search_results)
except:
    pass

'''
#tweet_cursor = feeds.find()


#for document in tweet_cursor:
   #for i in range(len(search_results[name])):
      #if(name in document):
         #print('-----')
         #print('name:-',name)
        # print('text:-',document[name][i])
'''