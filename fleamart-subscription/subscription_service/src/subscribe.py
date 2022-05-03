from flask import Blueprint, Flask, Response, request
from subscription_service.src import session
import re
subscribe =Blueprint('subscribe', __name__)
session_created= session.get_session()
@subscribe.route("/subscribe",methods=['POST'])
def send_subscription():
    data=request.get_json()
    email=data['email']
    topic=data['topic']
    status_code = Response(status=200)
    sns=session_created.client('sns')
    response = sns.list_topics()
    topics = response["Topics"]
    for topicArn in topics:
        if(topic==topic_name(topicArn['TopicArn'])):
            current_arn=topicArn['TopicArn']
    print(current_arn)

    response = sns.subscribe(TopicArn=current_arn, Protocol="email", Endpoint=email)
    subscription_arn = response["SubscriptionArn"]
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