package dal.edu.fleamart.postManagement.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;

import dal.edu.fleamart.postManagement.controller.PostNotFoundException;
import dal.edu.fleamart.postManagement.entities.Post;
import dal.edu.fleamart.postManagement.entities.PostAttribute;
import dal.edu.fleamart.postManagement.entities.ProductCategory;
import dal.edu.fleamart.postManagement.entities.Status;

@Repository
public class PostRepository implements PostAttribute {

	private static final String SEARCH_POST_BY_USER = "UserId = :userId";

	private final static String SEARCH_POST_BY_CATEGORY_STATUS_CITY_COUNTRY = "ProductCategory = :category and ItemStatus = :status and SellerAddress.City = :city and SellerAddress.Country = :country";

	private final static String SEARCH_POST_BY_STATUS_CITY_COUNTRY = "ItemStatus = :status and SellerAddress.City = :city and SellerAddress.Country = :country";
	
	private static final Logger LOG = LogManager.getLogger();
	
	@Autowired
	private DynamoDBMapper mapper;
	
	@Autowired
	private DynamoDBMapperConfig dynamoDBMapperConfig;

	public Post save(Post post) {
		mapper.save(post);
		return post;
	}

	public Post getPostById(String postId) {
		return mapper.load(Post.class, postId, dynamoDBMapperConfig);
	}

//	Learnt how to use DynamoDBScanExpression from below AWS documentation for Java
//	https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.QueryScanExample.html
	public List<Post> getUserPost(String userId) {

		Map<String, AttributeValue> expression = new HashMap<String, AttributeValue>();
		expression.put(":userId", new AttributeValue().withS(userId));

		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression(SEARCH_POST_BY_USER)
				.withExpressionAttributeValues(expression);

		List<Post> userPosts = mapper.scan(Post.class, scanExpression);

		return userPosts;
	}

	public List<Post> getPost(ProductCategory category, Status status, String city, String country) {

		Map<String, AttributeValue> expression = new HashMap<String, AttributeValue>();
		expression.put(":category", new AttributeValue().withS(category.name()));
		expression.put(":status", new AttributeValue().withS(status.name()));
		expression.put(":city", new AttributeValue().withS(city));
		expression.put(":country", new AttributeValue().withS(country));

		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
				.withFilterExpression(SEARCH_POST_BY_CATEGORY_STATUS_CITY_COUNTRY)
				.withExpressionAttributeValues(expression);

		List<Post> userPosts = mapper.scan(Post.class, scanExpression);

		return userPosts;
	}

	public List<Post> getPost(Status status, String city, String country) {

		Map<String, AttributeValue> expression = new HashMap<String, AttributeValue>();
		expression.put(":status", new AttributeValue().withS(status.name()));
		expression.put(":city", new AttributeValue().withS(city));
		expression.put(":country", new AttributeValue().withS(country));

		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
				.withFilterExpression(SEARCH_POST_BY_STATUS_CITY_COUNTRY).withExpressionAttributeValues(expression);

		List<Post> userPosts = mapper.scan(Post.class, scanExpression);

		return userPosts;

	}

	public Post update(Post post) {
		
		ExpectedAttributeValue attributeValue = new ExpectedAttributeValue(new AttributeValue().withS(post.getId()));
		try {
			mapper.save(post, new DynamoDBSaveExpression().withExpectedEntry("Id", attributeValue), dynamoDBMapperConfig);
		}
		catch (ConditionalCheckFailedException execption) {
			LOG.error("Exception while updating Post with Id {}", post.getId());
			throw new PostNotFoundException("Post not Found");
		}
		return post;
	}
	
	public void deletePost(String postId) {
		
		Post post =  mapper.load(Post.class, postId, dynamoDBMapperConfig);
		if (Objects.isNull(post)) {
			throw new PostNotFoundException("Post not Found");
		}
		mapper.delete(post);
	}
	
}
