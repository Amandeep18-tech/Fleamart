package dal.edu.fleamart.postManagement.entities;

public enum Status {
	
	AVAILABLE("Available"), 
	SOLD("Sold");
	
	public final String value;

	Status(String value) {
		this.value = value;
	}

	public static boolean isValid(String value) {
		Boolean isValid = Boolean.FALSE;
		for (Status status : Status.values()) {
			if (status.value.equals(value)) {
				isValid = Boolean.TRUE;
			}
		}
		return isValid;
	}
	
	public static Status getStatus(String value) {
		Status status = null;
		for (Status s : Status.values()) {
			if (s.value.equals(value)) {
				status = s;
			}
		}
		return status;
	}
}
