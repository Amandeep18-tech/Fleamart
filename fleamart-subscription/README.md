
CSCI 5409 Cloud Computing

fleaMART (Subscription Service)

Group Number: 62

Group Name: SimpliCloud


Authors

[Rahul Kherajani (B00884966)] rh346685@dal.ca

[Akanksha Singh (B00892887)] akanksha.singh@dal.ca

[Amandeep Singh Matta (B00886925)] amansingh@dal.ca



Live Application URL

https://main.d29fadnnqs0sgt.amplifyapp.com/

The fleamart-Subscription service is used for Subscription module in Fleamart Application. This service includes 4 lambda functions which are used with AWS SNS. The lambdas are the following:
1. Notify: This service is used to notify the users that have subscribed to the topics in our application. This service is triggered through sns publish.
2. Subscribe: The user can subscribe to the product category on the frontend component and the user will a subscription email on their email to subscribe.
3. Unsubscribe: The user can unsubscribe to the product category they have already subscribed to.
4. Topics: This service is used to get all the topics which the user has subscribed to.
Lambdas are triggered by the API's using API gateway. The code for lambdas are in the following folder subscription_service/lambdas.
