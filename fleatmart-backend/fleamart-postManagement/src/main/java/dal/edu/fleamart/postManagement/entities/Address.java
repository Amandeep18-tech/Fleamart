package dal.edu.fleamart.postManagement.entities;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import dal.edu.fleamart.postManagement.dto.PostDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@ToString
@DynamoDBDocument
public class Address implements AddressAttribute {

	private String addressLine1;

	private String addressLine2;

	private String city;

	private String province;

	private String zipCode;

	private String country;

	@DynamoDBAttribute(attributeName = ADDRESS_LINE_1)
	public String getAddressLine1() {
		return addressLine1;
	}

	@DynamoDBAttribute(attributeName = ADDRESS_LINE_2)
	public String getAddressLine2() {
		return addressLine2;
	}

	@DynamoDBAttribute(attributeName = CITY)
	public String getCity() {
		return city;
	}

	@DynamoDBAttribute(attributeName = PROVINCE)
	public String getProvince() {
		return province;
	}

	@DynamoDBAttribute(attributeName = ZIPCODE)
	public String getZipCode() {
		return zipCode;
	}

	@DynamoDBAttribute(attributeName = COUNTRY)
	public String getCountry() {
		return country;
	}
	
	public static Address convertToAddress(PostDto dto) {
		Address address = Address.builder()
				.addressLine1(dto.getAddressLine1())
				.addressLine2(dto.getAddressLine2())
				.city(dto.getCity())
				.province(dto.getProvince())
				.country(dto.getCountry())
				.zipCode(dto.getZipCode())
				.build();
		return address;
	}
	
}
