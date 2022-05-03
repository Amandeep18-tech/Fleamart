package dal.edu.fleamart.postManagement.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(value = Include.NON_NULL)
public class APIResponseBody {
	
	private boolean success;
	
	private String message;
	
	private Object bodyObject;

}
