package com.citizencarepoint.backend.contact.dto;

import com.citizencarepoint.backend.contact.ContactMessage;
import java.time.LocalDateTime;

public class ContactMessageResponse {
    private final Long id;
    private final String name;
    private final String email;
    private final String phone;
    private final String message;
    private final LocalDateTime submittedAt;

    public ContactMessageResponse(Long id, String name, String email, String phone,
                                   String message, LocalDateTime submittedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
        this.submittedAt = submittedAt;
    }

    public static ContactMessageResponse from(ContactMessage m) {
        return new ContactMessageResponse(m.getId(), m.getName(), m.getEmail(), m.getPhone(), m.getMessage(), m.getSubmittedAt());
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getMessage() { return message; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
}
