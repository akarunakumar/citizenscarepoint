package com.citizencarepoint.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point. Running this starts an embedded Tomcat server on port 8080
 * (see application.properties) with an in-memory H2 database.
 *
 * Phase 3a scope: one entity (Salary Slip), proven end-to-end with no
 * frontend connection yet. Run this, then test with curl or Postman
 * before touching any HTML/JS — see README.md.
 */
@SpringBootApplication
public class CitizenCarePointApplication {

    public static void main(String[] args) {
        SpringApplication.run(CitizenCarePointApplication.class, args);
    }
}
