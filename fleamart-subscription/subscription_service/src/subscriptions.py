from flask import Blueprint, Flask, request
import re
import json
from subscription_service.src import session
subscriptions = Blueprint('subscriptions', __name__)
session_created = session.get_session()
sns = session_created.client('sns')


@subscriptions.route('/subscriptions', methods=['GET'])
def search():
    args = request.args

    # print(args.get("email"))
    email_of_user = args.get("email")
    response = sns.list_topics()
    topicsARNs = response["Topics"]
    
    topics_subscribed=[]
    for topicArn in topicsARNs:
        print(topicArn)
        if(get_subscribed(topicArn['TopicArn'],email_of_user)):
            topics_subscribed.append(topic_name(topicArn['TopicArn']))
    print(topics_subscribed)
    topics_user = {}
    topics_user['topics'] = topics_subscribed
    topics_user_json = json.dumps(topics_user)
    return topics_user_json


def get_subscribed(topicArn, email):
    response = sns.list_subscriptions_by_topic(TopicArn=topicArn)
    subscriptions = response["Subscriptions"]
    print(response["Subscriptions"])
    for sub in subscriptions:
        if sub["Endpoint"] == email and sub['SubscriptionArn']!='PendingConfirmation':
            return True


def topic_name(topicArn):
    # coding=utf8
    # the above tag defines encoding for this document and is for Python 2.x compatibility


    regex = r".*:.*:.*:(.*)"


    matches = re.finditer(regex, topicArn, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):

        
        for groupNum in range(0, len(match.groups())):
            groupNum = groupNum + 1

            
            return match.group(groupNum)
    
