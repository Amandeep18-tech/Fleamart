package dal.edu.fleamart.postManagement.controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dal.edu.fleamart.postManagement.convertors.ITypeConvertor;
import dal.edu.fleamart.postManagement.dto.APIResponseBody;
import dal.edu.fleamart.postManagement.dto.PostDto;
import dal.edu.fleamart.postManagement.dto.UpdatePostDto;
import dal.edu.fleamart.postManagement.entities.Post;
import dal.edu.fleamart.postManagement.entities.PostSearchCriteria;
import dal.edu.fleamart.postManagement.entities.ProductCategory;
import dal.edu.fleamart.postManagement.entities.Status;
import dal.edu.fleamart.postManagement.service.PostService;

@CrossOrigin
@RestController
@RequestMapping("/listing")
public class PostController extends AbstractPostController {

	private static final Logger LOG = LogManager.getLogger();

	@Autowired
	private PostService postService;
	
	@Autowired
	@Qualifier("postConvertor")
	private ITypeConvertor<Post, PostDto> postToDtoConvertor;

	@PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<APIResponseBody> createPost(@ModelAttribute @Valid PostDto dto, BindingResult result) {
		LOG.info("Create post request: {}", dto.toString());
		dto.validate(result);
		if (result.hasErrors()) {
			LOG.error("Validation error for Post. Number of errors: {}", result.getErrorCount());
			APIResponseBody response = getErrorResponseBody(ResponseMessage.POST_VALIDATION_FAILURE, getErrors(result));
			return ResponseEntity.badRequest().body(response);
		}
		postService.createPost(dto);
		APIResponseBody reponseBody = getSuccessResponseBody(ResponseMessage.POST_CREATED);
		return new ResponseEntity<>(reponseBody, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/{postId}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<APIResponseBody> updatePost(@PathVariable(value = "postId") String postId, 
			@ModelAttribute @Valid UpdatePostDto dto, BindingResult result) {
		LOG.info("Update post request: {}", dto.toString());
		dto.validate(result);
		if (result.hasErrors()) {
			LOG.error("Validation error for Post. Number of errors: {}", result.getErrorCount());
			APIResponseBody response = getErrorResponseBody(ResponseMessage.POST_VALIDATION_FAILURE, getErrors(result));
			return ResponseEntity.badRequest().body(response);
		}
		Post post = UpdatePostDto.convert(dto);
		post.setId(postId);
		postService.update(post);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<APIResponseBody> getPosts(
			@RequestParam(value = "productCategory", required = false) String productCategory,
			@RequestParam(value = "status") String status,
			@RequestParam(value = "country") String country,
			@RequestParam(value = "city") String city) {

		Status postStatus = Status.isValid(status) ? Status.getStatus(status) : null;
		ProductCategory postProductCategory = Objects.isNull(productCategory) ?
												null : ProductCategory.getCategory(productCategory);
		
		if (Objects.isNull(postProductCategory) && Objects.nonNull(postProductCategory)) {
			throw new PostBadRequestException(ResponseMessage.INVALID_PRODUCT_CATEGORY);
		} 		
		else if (Objects.isNull(postStatus)) {
			throw new PostBadRequestException(ResponseMessage.INVALID_STATUS);
		}
		else if (Objects.isNull(country)) {
			throw new PostBadRequestException(ResponseMessage.REQUIRE_COUNTRY_VALUE);
		}
		else if (Objects.isNull(city)) {
			throw new PostBadRequestException(ResponseMessage.REQUIRE_CITY_VALUE);
		}
		
		final PostSearchCriteria searchCriteria = PostSearchCriteria.builder()
													.productCategory(ProductCategory.getCategory(productCategory))
													.status(Status.getStatus(status))
													.city(city)
													.country(country)
													.build();
				
		List<Post> posts = postService.getPosts(searchCriteria);
		if (Optional.ofNullable(posts).isEmpty() || posts.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<PostDto> dtos = posts.stream().map(post -> postToDtoConvertor.convert(post)).collect(Collectors.toList());
		APIResponseBody response = getSuccessResponseBody(ResponseMessage.POST_RETRIEVED, dtos);
		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping(value = "/{postId}")
	public ResponseEntity<APIResponseBody> getPost(@PathVariable(value = "postId") String postId) {
		Post post = postService.getPostById(postId);
		if (Optional.ofNullable(post).isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		PostDto dto = Objects.nonNull(post) ? postToDtoConvertor.convert(post) : null;
		APIResponseBody response = getSuccessResponseBody(ResponseMessage.POST_RETRIEVED, dto);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping(value = "/user/{userId}")
	public ResponseEntity<APIResponseBody> getPosts(@PathVariable(value =  "userId") String userId) {
		List<Post> posts = postService.getUserPosts(userId);
		List<PostDto> dtos = posts.stream().map(post -> postToDtoConvertor.convert(post)).collect(Collectors.toList());
		if (Optional.ofNullable(dtos).isEmpty() || dtos.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		APIResponseBody response = getSuccessResponseBody(ResponseMessage.POST_RETRIEVED, dtos);
		return ResponseEntity.ok(response);
	}
	
	private List<String> getErrors(BindingResult result) {
		List<String> errorFields = result.getFieldErrors()
										.stream()
										.map(fieldError -> fieldError.getDefaultMessage())
										.collect(Collectors.toList());
		return errorFields;
	}
	
	@DeleteMapping(value = "/{postId}")
	public ResponseEntity<APIResponseBody> deletePost(@PathVariable(value =  "postId") String userId) {
		postService.delete(userId);
		return ResponseEntity.ok().build();
	}

}