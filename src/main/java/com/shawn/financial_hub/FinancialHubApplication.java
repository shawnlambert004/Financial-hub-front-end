package com.shawn.financial_hub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.shawn.financial_hub")
public class FinancialHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinancialHubApplication.class, args);
	}

}
