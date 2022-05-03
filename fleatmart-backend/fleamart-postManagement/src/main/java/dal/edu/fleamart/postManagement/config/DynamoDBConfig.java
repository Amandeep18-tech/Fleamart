package dal.edu.fleamart.postManagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

@Configuration
public class DynamoDBConfig {

	@Value("${aws.dynamo.db.access-key}")
	private String accessKey;

	@Value("${aws.dynamo.db.secret-key}")
	private String secretKey;

	@Value("${aws.dynamo.db.region}")
	private String region;

	@Value("${aws.dynamo.db.endpoint}")
	private String endpointUrl;

	@Bean
	public DynamoDBMapper getDynamoDBMapper() {
		return new DynamoDBMapper(getAmazonDynamoDB());
	}

	@Bean
	public AWSCredentials getAWSDynamoDBCredentials() {
		return new BasicAWSCredentials(accessKey, secretKey);
	}

	/*
	 * Learnt how to configure AmazonDynamoDB bean from below AWS Documentation
	 * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CodeSamples.Java.html
	 * 
	 */
	@Bean
	public AmazonDynamoDB getAmazonDynamoDB() {
		AmazonDynamoDB dynamoDbClient = AmazonDynamoDBClientBuilder
						.standard()
						.withCredentials(new AWSStaticCredentialsProvider(getAWSDynamoDBCredentials()))
						.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endpointUrl, region))
						.build();
		return dynamoDbClient;
	}
	
	@Bean
	public DynamoDBMapperConfig getDynamoDBMapperConfig() {
		return new DynamoDBMapperConfig.Builder()
				  .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
				  .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE_SKIP_NULL_ATTRIBUTES)
				  .build();
	}
	
	@Bean 
	public DynamoDB getDynamoDb() {
		return new DynamoDB(getAmazonDynamoDB());
	}
	
}
