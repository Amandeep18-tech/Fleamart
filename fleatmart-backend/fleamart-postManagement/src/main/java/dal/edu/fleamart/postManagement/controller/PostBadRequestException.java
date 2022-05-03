package dal.edu.fleamart.postManagement.controller;

import dal.edu.fleamart.postManagement.controller.AbstractPostController.ResponseMessage;

public class PostBadRequestException extends RuntimeException {
	
	public PostBadRequestException() {
		super();
	}
	
	public PostBadRequestException(String message) {
		super(message);
	}
	
	public PostBadRequestException(ResponseMessage message) {
		super(message.value);
	}

}
