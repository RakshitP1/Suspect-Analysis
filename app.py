from flask import Flask, escape, request, jsonify

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

from subprocess import call
app = Flask(__name__)

@app.route('/')
def hello():
    return "here"

@app.route('/create', methods=['GET'])
def load_form(): # get info form
    name = str(request.args.get('name')) # find the params
    twitter_handle = str(request.args.get('twitter_handle')) # find the params

    t=open("handle.txt", "w+")
    t.write(twitter_handle)
    t.close()

    f = open("name.txt","w+")
    f.write(name)
    f.close()

    call(["python", "mongo_read.py"])
    call(["python", "nlp_test.py"])
    return "Params: " + name + " " + twitter_handle

@app.route("/analyze-text")
def analyze_text():
    client = language.LanguageServiceClient()
    text =  request.args.get("text")
    text = text.replace('"', "")
    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT)
    sentiment = client.analyze_sentiment(document=document).document_sentiment
    score = sentiment.score
    magnitude = sentiment.magnitude

    json_return = {
        'score': score,
        'magnitude': magnitude
    }

    return jsonify(json_return)




