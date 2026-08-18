package com.citizencarepoint.backend.contact;

import com.citizencarepoint.backend.contact.dto.ContactMessageRequest;
import com.citizencarepoint.backend.contact.dto.ContactMessageResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessageResponse create(ContactMessageRequest request) {
        ContactMessage saved = repository.save(
                new ContactMessage(request.getName(), request.getEmail(), request.getPhone(), request.getMessage())
        );
        return ContactMessageResponse.from(saved);
    }

    public List<ContactMessageResponse> findAll() {
        return repository.findAllByOrderBySubmittedAtDesc().stream()
                .map(ContactMessageResponse::from)
                .toList();
    }
}
