import boto3


#Creating Session With Boto3.
def get_session():
    session = boto3.Session(
    aws_access_key_id='xxx',
    aws_secret_access_key='xxx',
    region_name="us-east-1"
    )
    return session