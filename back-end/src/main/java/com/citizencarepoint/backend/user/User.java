package com.citizencarepoint.backend.user;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Unlike Phase 2's localStorage simulation, this actually stores a
 * password — but only ever as a bcrypt hash (see SecurityConfig's
 * PasswordEncoder bean), never in plain text. The raw password the user
 * types never touches the database.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String passwordHash;

    // Room to grow into real role-based access later (Phase 5) without a
    // schema change — every user defaults to a plain citizen account.
    @Column(nullable = false)
    private String role = "CITIZEN";

    @Column(nullable = false)
    private LocalDateTime registeredAt;

    protected User() {
    }

    public User(String name, String email, String mobile, String passwordHash) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.passwordHash = passwordHash;
        this.registeredAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMobile() { return mobile; }
    public String getPasswordHash() { return passwordHash; }
    public String getRole() { return role; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
}
