package dal.edu.fleamart.postManagement.dto;

import java.util.Calendar;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import dal.edu.fleamart.postManagement.entities.Condition;
import dal.edu.fleamart.postManagement.entities.ProductCategory;
import dal.edu.fleamart.postManagement.entities.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Builder
public class PostDto {
	
	private String id;

	@NotEmpty(message = "User Id must not be empty")
	private String userId;

	@NotEmpty(message = "Product name must not be empty")
	private String productName;

	@NotEmpty(message = "Product category must not be empty")
	private String productCategory;

	@NotEmpty(message = "Description must not be empty")
	private String description;

	@NotEmpty(message = "Images are required")
	private MultipartFile[] images;
	
	private List<ImageDto> imageUrls;

	@NotNull(message = "Price must not be null")
	private Float price;

	@NotEmpty(message = "Currency must not be empty")
	private String currency;

	@NotEmpty(message = "Condition must not be empty")
	private String condition;

	private String addressLine1;

	private String addressLine2;

	@NotEmpty(message = "City must not be empty")
	private String city;

	private String province;

	private String zipCode;

	@NotEmpty(message = "Country must not be empty")
	private String country;

	@NotEmpty(message = "Seller contact must not be empty")
	private String sellerContact1;

	private String sellerContact2;

	@NotEmpty(message = "Status must not be empty")
	private String status;
	
	@JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Calendar createdDate;
	
	@JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Calendar soldDate;

	public void validate(BindingResult result) {
		validateCondition(result);
		validateProductCategory(result);
		validateStatus(result);
	}

	private void validateProductCategory(BindingResult result) {
		boolean isValidCategory = ProductCategory.isValid(productCategory);
		if (!isValidCategory) {
			String errorMessage = "Value of Product Category is not valid";
			result.addError(new FieldError(result.getObjectName(), "category", errorMessage));
		}
	}

	private void validateStatus(BindingResult result) {
		boolean isValidStatus = Status.isValid(status);
		if (!isValidStatus) {
			String errorMessage = "Value of Status is not valid";
			result.addError(new FieldError(result.getObjectName(), "status", errorMessage));
		}
	}

	private void validateCondition(BindingResult result) {
		boolean isValidCondition = Condition.isValid(condition);
		if (!isValidCondition) {
			String errorMessage = "Value of Condition is not valid";
			result.addError(new FieldError(result.getObjectName(), "condition", errorMessage));
		}
	}

}
