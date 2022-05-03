
from flask import Blueprint, Flask, Response, request
from subscription_service.src import session
unsubscribe =Blueprint('unsubscribe', __name__)
session_created= session.get_session()
import re
@unsubscribe.route("/unsubscribe",methods=['POST'])
def send_unsubscription_email():
    sns=session_created.client('sns')
    data=request.get_json()
    topic=data['topic']
    email=data['email']
    response = sns.list_topics()
    topics = response["Topics"]
    status_code = Response(status=200)
    for topicArn in topics:
        if(topic==topic_name(topicArn['TopicArn'])):
            current_arn=topicArn['TopicArn']
    response = sns.list_subscriptions_by_topic(TopicArn=current_arn)
    subscriptions = response["Subscriptions"]
    current_user_subscription_arn=''
    for subscriber in subscriptions:
        if email==subscriber['Endpoint']:
            current_user_subscription_arn=subscriber['SubscriptionArn']
    if not current_user_subscription_arn:
        return "Already susbcribed"
    sns.unsubscribe(SubscriptionArn=current_user_subscription_arn)
    return status_code

def topic_name(topicArn):
    # coding=utf8
    # the above tag defines encoding for this document and is for Python 2.x compatibility


    regex = r".*:.*:.*:(.*)"


    matches = re.finditer(regex, topicArn, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):

        
        for groupNum in range(0, len(match.groups())):
            groupNum = groupNum + 1

            
            return match.group(groupNum)