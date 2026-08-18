package com.citizencarepoint.backend.servicerequest.dto;

import com.citizencarepoint.backend.servicerequest.ServiceRequest;
import java.time.LocalDateTime;

public class ServiceRequestResponse {
    private final Long id;
    private final ServiceRequest.ServiceType serviceType;
    private final String name;
    private final String email;
    private final String phone;
    private final String details;
    private final ServiceRequest.Status status;
    private final LocalDateTime createdAt;

    public ServiceRequestResponse(Long id, ServiceRequest.ServiceType serviceType, String name, String email,
                                   String phone, String details, ServiceRequest.Status status, LocalDateTime createdAt) {
        this.id = id;
        this.serviceType = serviceType;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.details = details;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static ServiceRequestResponse from(ServiceRequest r) {
        return new ServiceRequestResponse(r.getId(), r.getServiceType(), r.getName(), r.getEmail(),
                r.getPhone(), r.getDetails(), r.getStatus(), r.getCreatedAt());
    }

    public Long getId() { return id; }
    public ServiceRequest.ServiceType getServiceType() { return serviceType; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getDetails() { return details; }
    public ServiceRequest.Status getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
