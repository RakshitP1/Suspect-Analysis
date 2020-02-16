
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import os


def tweet_interest_entities(text_content: str):
    """
    gives an anlysis of the text
    """
    positive_entities = []
    negative_entities = []
    client = language.LanguageServiceClient()
    document = types.Document(
        content=text_content,
        type=enums.Document.Type.PLAIN_TEXT)
    response = client.analyze_entity_sentiment(document=document)
    for entity in response.entities:
        if entity.sentiment.score > 0.5:
            positive_entities.append(entity)
        elif entity.sentiment.score < 0.5:
            negative_entities.append(entity)

    return (positive_entities, negative_entities)


def all_tweets_entities(tweets: list):
    all_positive_entities = {}
    all_negative_entities = {}
    for tweet in tweets:
        temp = tweet_interest_entities(tweet)
        add_entity_list(all_positive_entities, temp[0])
        add_entity_list(all_negative_entities, temp[1])

    return (sort_ent_dict(all_positive_entities, True), sort_ent_dict(all_negative_entities, False))

def sort_ent_dict(ent_dict, pos):
    ent_list = []
    for x in ent_dict:
        ent_list.append([x, ent_dict[x]])

    ent_list.sort(key=lambda ent: ent[1], reverse=pos)
    return ent_list[:9]



def add_to_entities(entity_list, entity):
    if entity.name in entity_list:
        entity_list[entity.name] += (entity.sentiment.score *
                                     entity.sentiment.magnitude)
    else:
        entity_list[entity.name] = entity.sentiment.score * \
            entity.sentiment.magnitude


def add_entity_list(big_entity_list, small_entity_list):
    for entity in small_entity_list:
        add_to_entities(big_entity_list, entity)


if __name__ == '__main__':
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "google-auth.json"
    z = open("tweetsList.txt", "r")
    text = z.read()
    print(all_tweets_entities([text]))
    z.close()
