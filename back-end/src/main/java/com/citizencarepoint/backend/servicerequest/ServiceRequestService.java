package com.citizencarepoint.backend.servicerequest;

import com.citizencarepoint.backend.servicerequest.dto.ServiceRequestRequest;
import com.citizencarepoint.backend.servicerequest.dto.ServiceRequestResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository repository;

    public ServiceRequestService(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    public ServiceRequestResponse create(ServiceRequestRequest request) {
        ServiceRequest saved = repository.save(new ServiceRequest(
                request.getServiceType(), request.getName(), request.getEmail(),
                request.getPhone(), request.getDetails()
        ));
        return ServiceRequestResponse.from(saved);
    }

    public List<ServiceRequestResponse> findAll(ServiceRequest.ServiceType type) {
        List<ServiceRequest> results = (type == null)
                ? repository.findAllByOrderByCreatedAtDesc()
                : repository.findAllByServiceTypeOrderByCreatedAtDesc(type);

        return results.stream().map(ServiceRequestResponse::from).toList();
    }
}
