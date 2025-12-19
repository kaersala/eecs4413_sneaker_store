package edu.yorku.sneaker_store_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication(excludeName = "org.springframework.boot.devtools.autoconfigure.DevToolsDataSourceAutoConfiguration")
public class SneakerStoreBackendApplication {

    public static void main(String[] args) {
        // Prints a BCrypt hash for whoever needs to seed/update admin passwords quickly.
        String plain = System.getenv().getOrDefault("ADMIN_PASSWORD_TO_HASH", "password");
        String generatedHash = new BCryptPasswordEncoder().encode(plain);
        System.out.println("BCrypt hash for '" + plain + "' => " + generatedHash);
        SpringApplication.run(SneakerStoreBackendApplication.class, args);
    }


}
