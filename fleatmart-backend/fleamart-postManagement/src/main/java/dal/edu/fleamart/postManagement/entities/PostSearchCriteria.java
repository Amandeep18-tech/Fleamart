package dal.edu.fleamart.postManagement.entities;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author singh
 *
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public final class PostSearchCriteria {

	private ProductCategory productCategory;
	
	private Status status;
	
	private String country;
	
	private String city;
	
	public boolean allCriteriaSearch() {
		return Objects.nonNull(productCategory) && Objects.nonNull(status) && Objects.nonNull(country) && Objects.nonNull(city); 
	}
	
	public boolean searchByStatusCountryCity() {
		return Objects.nonNull(status) && Objects.nonNull(country) && Objects.nonNull(city); 
	}

}
