package com.citizencarepoint.backend.servicerequest;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findAllByOrderByCreatedAtDesc();
    List<ServiceRequest> findAllByServiceTypeOrderByCreatedAtDesc(ServiceRequest.ServiceType serviceType);
}
