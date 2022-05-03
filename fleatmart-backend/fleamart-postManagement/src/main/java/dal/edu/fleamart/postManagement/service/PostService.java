package dal.edu.fleamart.postManagement.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dal.edu.fleamart.postManagement.dto.PostDto;
import dal.edu.fleamart.postManagement.entities.Post;
import dal.edu.fleamart.postManagement.entities.PostSearchCriteria;
import dal.edu.fleamart.postManagement.entities.Status;
import dal.edu.fleamart.postManagement.repository.PostRepository;

@Service
public class PostService {

	private static final Logger LOG = LogManager.getLogger();
	
	private static final String IMAGE_FILE_NAME_FORMAT = "%s_%d%s";
	
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private S3Services s3Services;

	public void createPost(PostDto postDto) {
		Post post = Post.convertToPost(postDto);
		post.setCreatedDate(Calendar.getInstance());
		post.setStatus(Status.AVAILABLE);

		List<MultipartFile> imagesMultipart = Arrays.stream(postDto.getImages()).collect(Collectors.toList());
		List<File> imageFiles = convertMultipartFileToFile(imagesMultipart, postDto.getUserId());

		Map<String, String> imageUrls = new HashMap<String, String>();
		String productCategory = post.getProductCategory().name();
		for (File image : imageFiles) {
			String imageUrl = s3Services.upload(image, productCategory);
			imageUrls.put(image.getName(), imageUrl);
		}
		post.setImageUrls(imageUrls);
		
		Post savedPost = postRepository.save(post);

//		Delete files from S3 if save post is not successful
		if (Objects.isNull(savedPost)) {
			LOG.warn("Save Post not successful. Deleting {} files from S3 bucket.", imageUrls.size());
			for (String fileKey : imageUrls.values()) {
				s3Services.delete(productCategory, fileKey);
			}
		}
	}
	
	public Post getPostById(String postId) {
		return postRepository.getPostById(postId);
	}
	
	public List<Post> getPosts(PostSearchCriteria searchCriteria) {
		
		List<Post> posts = null;
		if (searchCriteria.allCriteriaSearch()) {
			posts = postRepository.getPost(searchCriteria.getProductCategory(), 
											searchCriteria.getStatus(),
											searchCriteria.getCity(), 
											searchCriteria.getCountry());
		}
		else if (searchCriteria.searchByStatusCountryCity()) {
			posts = postRepository.getPost(searchCriteria.getStatus(),
											searchCriteria.getCity(), 
											searchCriteria.getCountry());
		}
		
		return posts;
	}
	
	public List<Post> getUserPosts(String userId) {
		return postRepository.getUserPost(userId);
	}

	public void update(Post post) {
		if (post.getStatus() == Status.SOLD) {
			post.setSoldDate(Calendar.getInstance());
		}
		postRepository.update(post);
	}
	
	public void delete(String postId) {
		
		postRepository.deletePost(postId);
	}
	
	private List<File> convertMultipartFileToFile(List<MultipartFile> multipartFiles, String userId) {
		List<File> files = new ArrayList<>();
		for (MultipartFile multipartFile : multipartFiles) {
			String newFileName = generateFileName(multipartFile.getOriginalFilename(), userId);
			File imageFile = new File(newFileName);
			try (FileOutputStream outputStream = new FileOutputStream(imageFile);) {
				outputStream.write(multipartFile.getBytes());
				files.add(imageFile);
			} catch (IOException ioException) {
				LOG.error("Exception while trying to converting Multipart image to image File");
				ioException.printStackTrace();
			}
		}
		return files;
	}
	
	private String generateFileName(String originalFileName, String userId) {
		String fileTypeSuffix = originalFileName.substring(originalFileName.lastIndexOf("."));
		String newFileName = String.format(IMAGE_FILE_NAME_FORMAT, userId, new Date().getTime(), fileTypeSuffix);
		return newFileName;
	}

}
