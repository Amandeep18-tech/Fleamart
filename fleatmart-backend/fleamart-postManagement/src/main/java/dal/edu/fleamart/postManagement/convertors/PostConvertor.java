package dal.edu.fleamart.postManagement.convertors;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Component;

import dal.edu.fleamart.postManagement.dto.ImageDto;
import dal.edu.fleamart.postManagement.dto.PostDto;
import dal.edu.fleamart.postManagement.entities.Address;
import dal.edu.fleamart.postManagement.entities.Post;

@Component("postConvertor")
public class PostConvertor implements ITypeConvertor<Post, PostDto> {

	@Override
	public PostDto convert(Post post) {
		
		List<ImageDto> imageDto = new ArrayList<>();
		for (Map.Entry<String, String> entry : post.getImageUrls().entrySet()) {
			imageDto.add(new ImageDto(entry.getKey(), entry.getValue()));
		}
		
		PostDto postDto = PostDto.builder()	
							.id(post.getId())
							.userId(post.getUserId())
							.productName(post.getProductName())
							.productCategory(post.getProductCategory().value)
							.description(post.getDescription())
							.imageUrls(imageDto)
							.price(post.getPrice())
							.currency(post.getCurrency())
							.condition(post.getCondition().value)
							.status(post.getStatus().value)
							.createdDate(post.getCreatedDate())
							.soldDate(post.getSoldDate())
							.sellerContact1(post.getSellerContact1())
							.sellerContact2(post.getSellerContact2())
							.build();
		
		Address address = post.getSellerAddress();
		if (Objects.nonNull(address)) {
			postDto.setAddressLine1(address.getAddressLine1());
			postDto.setAddressLine2(address.getAddressLine2());
			postDto.setCity(address.getCity());
			postDto.setProvince(address.getProvince());
			postDto.setCountry(address.getCountry());
			postDto.setZipCode(address.getZipCode());
		}
		
		return postDto;
	}

}
