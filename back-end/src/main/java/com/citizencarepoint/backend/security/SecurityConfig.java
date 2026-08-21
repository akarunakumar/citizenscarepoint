package com.citizencarepoint.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * IMPORTANT — current scope (documented honestly rather than hidden):
 * /api/salary-slips/**, /api/contact-messages/** and /api/service-requests/**
 * are left PUBLIC (permitAll) for now, same as Phase 2's localStorage
 * version had no real access control either. Real per-user ownership
 * (e.g. "only see your own salary slips") needs each of those entities to
 * store a userId and each controller to check the authenticated caller —
 * a natural next increment once you're comfortable with the auth flow
 * itself, not added here to keep this phase's scope contained.
 *
 * What Phase 3d DOES lock down: only /api/auth/me requires a valid JWT,
 * as the proof that the whole login → token → protected request loop
 * actually works end to end.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable()) // stateless JSON API, no browser form/cookie session to protect
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/login").permitAll()                       
                        .requestMatchers("/api/salary-slips/**").permitAll()
                        .requestMatchers("/api/contact-messages/**").permitAll()
                        .requestMatchers("/api/service-requests/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated() // everything else, e.g. /api/auth/me, needs a valid token
                )
                .headers(headers -> headers.frameOptions(frame -> frame.disable())) // needed for H2 console
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    
}
