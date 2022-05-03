package dal.edu.fleamart.postManagement.controller;

public class PostNotFoundException extends RuntimeException {
	
	public PostNotFoundException() {
		super();
	}
	
	public PostNotFoundException(String message) {
		super(message);
	}

}
