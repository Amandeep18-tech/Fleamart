package dal.edu.fleamart.postManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class FleamartPostManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(FleamartPostManagementApplication.class, args);
	}

//	Learnt how to configure the Swagger Docket bean from 
//	https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api
	@Bean
    public Docket postManagementApiSwaggerConfig() {
        return new Docket(DocumentationType.SWAGGER_2)
    		  .select()
    		  .paths(PathSelectors.any())
    		  .apis(RequestHandlerSelectors.basePackage("dal.edu.fleamart"))
    		  .build();
    }
		
}
