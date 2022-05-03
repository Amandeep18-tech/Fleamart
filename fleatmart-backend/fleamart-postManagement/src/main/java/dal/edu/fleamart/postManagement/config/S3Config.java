package dal.edu.fleamart.postManagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class S3Config {

	@Value("${aws.s3.access-key}")
	private String accessKey;

	@Value("${aws.s3.secret-key}")
	private String secretKey;

	@Value("${aws.s3.region}")
	private String s3region;

	@Bean
	public AmazonS3 getAmazonS3() {
		return AmazonS3ClientBuilder.standard().withRegion(s3region)
				.withCredentials(new AWSStaticCredentialsProvider(getAWSS3Credentials())).build();
	}

	@Bean
	public AWSCredentials getAWSS3Credentials() {
		return new BasicAWSCredentials(accessKey, secretKey);
	}

}
