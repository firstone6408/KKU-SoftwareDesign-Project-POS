package com.sdp.pos.init;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sdp.pos.init.seed.UserSeeder;

@Configuration
public class DataInitializer {
    private final UserSeeder userSeeder;

    public DataInitializer(UserSeeder userSeeder) {
        this.userSeeder = userSeeder;
    }

    @Bean
    CommandLineRunner initData() {
        return args -> {
            userSeeder.seed();
        };
    }
}
