from flask import Flask, escape, request, jsonify

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

app = Flask(__name__)

@app.route('/') 
def hello():
    return "Hello, World!"

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