package dal.edu.fleamart.postManagement.entities;

public enum ProductCategory {

	FURNITURE("Furniture"), 
	ELECTRONICS("Electronics"), 
	OTHERS("Others");
	
	public final String value;

	ProductCategory(String value) {
		this.value = value;
	}

	public static boolean isValid(String value) {
		Boolean isValid = Boolean.FALSE;
		for (ProductCategory category : ProductCategory.values()) {
			if (category.value.equals(value)) {
				isValid = Boolean.TRUE;
			}
		}
		return isValid;
	}
	
	public static ProductCategory getCategory(String value) {
		ProductCategory productCategory = null;
		for (ProductCategory category : ProductCategory.values()) {
			if (category.value.equals(value)) {
				productCategory = category;
			}
		}
		return productCategory;
	}

}
