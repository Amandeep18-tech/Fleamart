package dal.edu.fleamart.postManagement.service;

import java.io.File;
import java.net.URL;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectResult;

@Service
public class S3Services {

	private static final Logger LOG = LogManager.getLogger();

	@Value("${application.bucket.prefix}")
	private String bucketPrefix;

	@Autowired
	private AmazonS3 amazonS3;

	public String upload(File file, String bucketNameSuffix) {
		String objectUrl = null;
		String fileKey = file.getName();
		String bucketName = getBucketName(bucketNameSuffix);
		LOG.info("Uploading {} to bucket {}", file.getName(), bucketName);
		try {
			PutObjectResult putResult = amazonS3.putObject(bucketName, fileKey, file);
			LOG.info("ETag of the uploaded File {} is {}", fileKey, putResult.getETag());
			URL fileURL = amazonS3.getUrl(bucketName, fileKey);
			objectUrl = fileURL.toExternalForm();
		} catch (Exception e) {
			LOG.error("AmazonServiceException while uploading image {}", fileKey);
			e.printStackTrace();
		}
		return objectUrl;
	}
	
	public void delete(String bucketSuffix, String fileKey) {
		String bucketName = getBucketName(bucketSuffix);
		amazonS3.deleteObject(bucketName, fileKey);
	}

	private String getBucketName(String bucketNameSuffix) {
		String bucketNameFormat = "%s-%s";
		return String.format(bucketNameFormat, bucketPrefix, bucketNameSuffix).toLowerCase();
	}

}
