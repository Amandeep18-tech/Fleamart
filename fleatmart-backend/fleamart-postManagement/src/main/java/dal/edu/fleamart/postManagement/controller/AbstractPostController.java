package dal.edu.fleamart.postManagement.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import dal.edu.fleamart.postManagement.dto.APIResponseBody;

@RestControllerAdvice
public abstract class AbstractPostController {
	
	private static final Logger LOG = LogManager.getLogger();
	
	protected enum ResponseMessage {
		
		POST_RETRIEVED("Post retrieved"),
		POST_CREATED("Post created"),
		
		REQUIRE_CITY_VALUE("Value of city is required"),
		REQUIRE_COUNTRY_VALUE("Value of Country is required"),
		
		INVALID_STATUS("Invalid status"),
		INVALID_PRODUCT_CATEGORY("Invalid Product Category"),
		
		POST_NOT_FOUND("Post not found"),
		POST_VALIDATION_FAILURE("Error(s) validating post");
		
		String value;

		ResponseMessage(String value) {
			this.value = value;
		}
		
	}
	
	public APIResponseBody getSuccessResponseBody() {
		APIResponseBody response = APIResponseBody.builder().success(true).build();
		return response;
	}
	
	public APIResponseBody getSuccessResponseBody(ResponseMessage message) {
		APIResponseBody response = getSuccessResponseBody();
		response.setMessage(message.value);
		return response;
	}
	
	public APIResponseBody getSuccessResponseBody(ResponseMessage message, Object bodyObject) {
		APIResponseBody response = getSuccessResponseBody(message);
		response.setBodyObject(bodyObject);
		return response;
	}
	
	public APIResponseBody getErrorResponseBody(ResponseMessage message) {
		APIResponseBody response = APIResponseBody.builder()
											.success(false)
											.message(message.value)
											.build();
		return response;
	}
	
	public APIResponseBody getErrorResponseBody(ResponseMessage message, Object bodyObject) {
		APIResponseBody response = getErrorResponseBody(message);
		response.setBodyObject(bodyObject);
		return response;
	}
	
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(value = PostBadRequestException.class)
	public String returnBadRequest(RuntimeException runtimeException) {
		return runtimeException.getMessage();
	} 
	
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = PostNotFoundException.class)
	public String returnNotFound(RuntimeException runtimeException) {
		return runtimeException.getMessage();
	} 
	
	@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(value = Exception.class)
	public String returnInternalServerError(Exception execption) {
		LOG.error("An exception has occured while processing request on /listing: {}", execption.getMessage());
		execption.printStackTrace();
		return execption.getMessage();
	} 

}
