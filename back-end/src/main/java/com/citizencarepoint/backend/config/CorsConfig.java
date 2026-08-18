package com.citizencarepoint.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Allows the CitizenCarePoint frontend — served from a different origin
 * (localhost:8000 / 127.0.0.1:5500 during local dev, the Netlify domain
 * once deployed) — to call this API from browser JavaScript.
 *
 * IMPORTANT (Phase 3f note): "*" origins or a wide-open policy is fine for
 * local learning, but before the real deploy, this must be tightened to
 * the exact Netlify URL — an API open to any website is a real security
 * gap once this is live on the internet with a real database behind it.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:8000",
                        "http://127.0.0.1:8000",
                        "http://127.0.0.1:5500",
                        "http://localhost:5500",
                        "http://localhost:4200", // Angular dev server (Phase 4)
                        "https://citizenscarepoint.netlify.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
