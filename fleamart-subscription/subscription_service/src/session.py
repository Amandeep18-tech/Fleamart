import boto3


#Creating Session With Boto3.
def get_session():
    session = boto3.Session(
    aws_access_key_id='AKIA3EOK4A4FHRPDX5OJ',
    aws_secret_access_key='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',
    region_name="us-east-1"
    )
    return session