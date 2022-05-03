package dal.edu.fleamart.postManagement.dto;

import java.util.Map;
import java.util.Objects;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import dal.edu.fleamart.postManagement.entities.Address;
import dal.edu.fleamart.postManagement.entities.Condition;
import dal.edu.fleamart.postManagement.entities.Post;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdatePostDto {

	private String productName;

	private String productCategory;

	private String description;

	private MultipartFile[] images;
	
	private Map<String, String> imageUrls;

	private Float price;

	private String currency;

	private String condition;

	private String addressLine1;

	private String addressLine2;

	private String city;

	private String province;

	private String zipCode;

	private String country;

	@JsonInclude
	private String sellerContact1;

	@JsonInclude
	private String sellerContact2;

	private String status;

	public static Post convert(UpdatePostDto dto) {
		Address address = Address.builder()
				.addressLine1(dto.getAddressLine1())
				.addressLine2(dto.getAddressLine2())
				.city(dto.getCity())
				.province(dto.getProvince())
				.country(dto.getCountry())
				.zipCode(dto.getZipCode())
				.build();

		return Post.builder()
				.productName(dto.getProductName())
				.productCategory(ProductCategory.getCategory(dto.getProductCategory()))
				.description(dto.getDescription())
				.price(dto.getPrice())
				.currency(dto.getCurrency())
				.condition(Condition.getCondition(dto.getCondition()))
				.sellerAddress(isAddressNull(address) ? null : address)
				.sellerContact1(dto.getSellerContact1())
				.sellerContact2(dto.getSellerContact2())
				.status(Status.getStatus(dto.getStatus()))
				.build();
	}
	
	public void validate(BindingResult result) {
		if (Objects.nonNull(condition)) {
			validateCondition(result);
		}
		if (Objects.nonNull(productCategory)) {
			validateProductCategory(result);
		}
		if (Objects.nonNull(status)) {
			validateStatus(result);	
		}
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
	
	public static boolean isAddressNull(Address address) {
		return Objects.isNull(address.getAddressLine1()) 
				&& Objects.isNull(address.getAddressLine2()) 
				&& Objects.isNull(address.getCity()) 
				&& Objects.isNull(address.getProvince()) 
				&& Objects.isNull(address.getCountry()) 
				&& Objects.isNull(address.getZipCode());
	}
	
}
