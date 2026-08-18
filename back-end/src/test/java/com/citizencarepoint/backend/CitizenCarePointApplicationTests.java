package com.citizencarepoint.backend;

import com.citizencarepoint.backend.salaryslip.dto.SalarySlipRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CitizenCarePointApplicationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void contextLoads() {
        // If this passes, Spring successfully wired every bean —
        // controller, service, repository, and the H2 database connection.
    }

    @Test
    void createAndListSalarySlip() {
        // /api/salary-slips is intentionally public (see SecurityConfig) —
        // this test also doubles as confirmation that stays true.
        SalarySlipRequest request = new SalarySlipRequest();
        request.setName("Test Employee");
        request.setMonth("2026-08");
        request.setBasicPay(40000);
        request.setAllowances(5000);
        request.setDeductions(2000);

        String baseUrl = "http://localhost:" + port + "/api/salary-slips";

        ResponseEntity<Object> createResponse = restTemplate.postForEntity(baseUrl, request, Object.class);
        assertThat(createResponse.getStatusCode().value()).isEqualTo(201);

        ResponseEntity<Object[]> listResponse = restTemplate.getForEntity(baseUrl, Object[].class);
        assertThat(listResponse.getStatusCode().value()).isEqualTo(200);
        assertThat(listResponse.getBody()).isNotEmpty();
    }
}
