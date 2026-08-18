package com.citizencarepoint.backend.salaryslip;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * The database representation of a salary slip. This is intentionally
 * NOT what the API sends/receives directly — see dto/SalarySlipRequest
 * and dto/SalarySlipResponse for that. Keeping them separate means the
 * database schema and the API contract can evolve independently.
 */
@Entity
@Table(name = "salary_slips")
public class SalarySlip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String month; // stored as "YYYY-MM", matching the <input type="month"> value

    @Column(nullable = false)
    private double basicPay;

    @Column(nullable = false)
    private double allowances;

    @Column(nullable = false)
    private double deductions;

    // Computed server-side in SalarySlipService — the frontend no longer
    // does this math itself, the way it did in Phase 2's localStorage version.
    @Column(nullable = false)
    private double netPay;

    @Column(nullable = false)
    private LocalDateTime generatedAt;

    protected SalarySlip() {
        // Required by JPA — do not call directly.
    }

    public SalarySlip(String name, String month, double basicPay, double allowances, double deductions) {
        this.name = name;
        this.month = month;
        this.basicPay = basicPay;
        this.allowances = allowances;
        this.deductions = deductions;
        this.netPay = basicPay + allowances - deductions;
        this.generatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getMonth() { return month; }
    public double getBasicPay() { return basicPay; }
    public double getAllowances() { return allowances; }
    public double getDeductions() { return deductions; }
    public double getNetPay() { return netPay; }
    public LocalDateTime getGeneratedAt() { return generatedAt; }
}
