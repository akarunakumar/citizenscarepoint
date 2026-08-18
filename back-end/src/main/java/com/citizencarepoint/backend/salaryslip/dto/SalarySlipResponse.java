package com.citizencarepoint.backend.salaryslip.dto;

import com.citizencarepoint.backend.salaryslip.SalarySlip;
import java.time.LocalDateTime;

/**
 * What the API returns to the frontend — built from a SalarySlip entity
 * via the static from() factory below, so controllers never hand back a
 * raw @Entity object directly.
 */
public class SalarySlipResponse {

    private final Long id;
    private final String name;
    private final String month;
    private final double basicPay;
    private final double allowances;
    private final double deductions;
    private final double netPay;
    private final LocalDateTime generatedAt;

    public SalarySlipResponse(Long id, String name, String month, double basicPay,
                               double allowances, double deductions, double netPay,
                               LocalDateTime generatedAt) {
        this.id = id;
        this.name = name;
        this.month = month;
        this.basicPay = basicPay;
        this.allowances = allowances;
        this.deductions = deductions;
        this.netPay = netPay;
        this.generatedAt = generatedAt;
    }

    public static SalarySlipResponse from(SalarySlip slip) {
        return new SalarySlipResponse(
                slip.getId(),
                slip.getName(),
                slip.getMonth(),
                slip.getBasicPay(),
                slip.getAllowances(),
                slip.getDeductions(),
                slip.getNetPay(),
                slip.getGeneratedAt()
        );
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
