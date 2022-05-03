package dal.edu.fleamart.postManagement.entities;

public enum Condition {

	NEW("New"), 
	USED_FAIR("Used - Fair"), 
	FACTORY_REFURBISHED("Factory Refurbished");

	public final String value;

	Condition(String value) {
		this.value = value;
	}

	public static boolean isValid(String value) {
		Boolean isValid = Boolean.FALSE;
		for (Condition condition : Condition.values()) {
			if (condition.value.equals(value)) {
				isValid = Boolean.TRUE;
			}
		}
		return isValid;
	}

	public static Condition getCondition(String value) {
		Condition category = null;
		for (Condition c : Condition.values()) {
			if (c.value.equals(value)) {
				category = c;
			}
		}
		return category;
	}

}
