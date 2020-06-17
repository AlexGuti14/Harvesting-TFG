package com.backend.demo.quartz.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SwaggerAPI {                                    
    @Bean
    public Docket api() { 
        return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
          	.select()                                  
          	.apis(RequestHandlerSelectors.basePackage("com.backend.demo.quartz.controller"))             
          	.paths(PathSelectors.any())                          
          	.build();                                           
    }

    private ApiInfo apiInfo() {

        return new ApiInfoBuilder()

				.title("Harvesting Job API")
				.description("API job planning")
                .license("Apache 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
                .version("1.0.0")
                .build();

	}
}