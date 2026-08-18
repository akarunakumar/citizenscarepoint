package com.citizencarepoint.backend.servicerequest;

import com.citizencarepoint.backend.servicerequest.dto.ServiceRequestRequest;
import com.citizencarepoint.backend.servicerequest.dto.ServiceRequestResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ServiceRequestResponse> create(@Valid @RequestBody ServiceRequestRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    /**
     * GET /api/service-requests           -> all requests, any type
     * GET /api/service-requests?type=INSURANCE -> only that type
     */
    @GetMapping
    public ResponseEntity<List<ServiceRequestResponse>> findAll(
            @RequestParam(required = false) ServiceRequest.ServiceType type
    ) {
        return ResponseEntity.ok(service.findAll(type));
    }
}
