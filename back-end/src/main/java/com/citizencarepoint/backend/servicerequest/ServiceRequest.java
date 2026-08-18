package com.citizencarepoint.backend.servicerequest;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * One table covers Certificate Services, Insurance Agents, Housekeeping
 * and IT Support, distinguished by `serviceType`. They all share the same
 * real shape — someone submits contact details + what they need, and it
 * needs to be tracked until resolved — so four near-identical entities
 * would just be copy-pasted duplication. If one of these services grows
 * genuinely distinct fields later (e.g. Certificate Services needing a
 * document upload), it can graduate into its own entity at that point.
 */
@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    public enum ServiceType {
        CERTIFICATE, INSURANCE, HOUSEKEEPING, IT_SUPPORT
    }

    public enum Status {
        NEW, IN_PROGRESS, RESOLVED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType serviceType;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false, length = 2000)
    private String details;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.NEW;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    protected ServiceRequest() {
    }

    public ServiceRequest(ServiceType serviceType, String name, String email, String phone, String details) {
        this.serviceType = serviceType;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.details = details;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public ServiceType getServiceType() { return serviceType; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getDetails() { return details; }
    public Status getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
