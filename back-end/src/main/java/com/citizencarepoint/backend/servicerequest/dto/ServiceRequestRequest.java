package com.citizencarepoint.backend.servicerequest.dto;

import com.citizencarepoint.backend.servicerequest.ServiceRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ServiceRequestRequest {

    @NotNull(message = "Service type is required")
    private ServiceRequest.ServiceType serviceType;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Must be a valid email address")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Please describe what you need")
    private String details;

    public ServiceRequest.ServiceType getServiceType() { return serviceType; }
    public void setServiceType(ServiceRequest.ServiceType serviceType) { this.serviceType = serviceType; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
