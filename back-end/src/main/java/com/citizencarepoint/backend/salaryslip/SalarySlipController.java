package com.citizencarepoint.backend.salaryslip;

import com.citizencarepoint.backend.salaryslip.dto.SalarySlipRequest;
import com.citizencarepoint.backend.salaryslip.dto.SalarySlipResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Thin HTTP layer — no business logic here, just translating requests
 * to service calls and results to HTTP responses. Keeping controllers
 * "thin" like this is what makes the service layer independently
 * testable, and easy to reuse if this app ever grows a second entry
 * point (e.g. a batch job) that needs the same logic.
 */
@RestController
@RequestMapping("/api/salary-slips")
public class SalarySlipController {

    private final SalarySlipService service;

    public SalarySlipController(SalarySlipService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SalarySlipResponse> create(@Valid @RequestBody SalarySlipRequest request) {
        SalarySlipResponse created = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<SalarySlipResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
