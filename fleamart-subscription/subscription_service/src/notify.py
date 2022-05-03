from email import message
from flask import Blueprint, Flask, Response, request
from subscription_service.src import session
import re
notify = Blueprint('notify', __name__)
session_created = session.get_session()


@notify.route("/notify", methods=['POST'])
def send_notification():

    sns = session_created.client('sns')
    data=request.get_json()
    message=data['message']
    topic=data['topic']
    status_code = Response(status=200)
    response = sns.list_topics()
    topics = response["Topics"]
    for topicArn in topics:
        if(topic==topic_name(topicArn['TopicArn'])):
            current_arn=topicArn['TopicArn']
    print(current_arn)
    

    response = sns.publish(TopicArn=current_arn,
                           Message=message, Subject="Hello")

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