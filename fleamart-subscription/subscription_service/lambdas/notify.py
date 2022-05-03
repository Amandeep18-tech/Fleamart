import re
import boto3
import os



def lambda_handler(event,context):

    sns = boto3.client(
            "sns",
            aws_access_key_id=os.environ.get('aws_access_key_id'), 
            aws_secret_access_key=os.environ.get('aws_secret_access_key'),
            region_name=os.environ.get('region_name')
    )
    print(event)
    
    message=event['message']
    topic=event['topic']
    
    response = sns.list_topics()
    topics = response["Topics"]
    for topicArn in topics:
        if(topic==topic_name(topicArn['TopicArn'])):
            current_arn=topicArn['TopicArn']
    response = sns.publish(TopicArn=current_arn,
                           Message=message, Subject=message)
    responseBody={}
    responseBody['statusCode']=200
    responseBody['headers']={}
    responseBody['headers']['Access-Control-Allow-Origin']="*"
    responseBody['headers']['ContentType']="application/json"
    
    return responseBody

def topic_name(topicArn):
    # coding=utf8
    # the above tag defines encoding for this document and is for Python 2.x compatibility


    regex = r".*:.*:.*:(.*)"


    matches = re.finditer(regex, topicArn, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):

        
        for groupNum in range(0, len(match.groups())):
            groupNum = groupNum + 1

            
            return match.group(groupNum)