package com.citizencarepoint.backend.salaryslip.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

/**
 * What the frontend sends in the POST /api/salary-slips request body.
 * Deliberately does NOT include netPay or id — those are the server's
 * responsibility to compute/assign, not the client's.
 */
public class SalarySlipRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Month is required")
    private String month;

    @PositiveOrZero(message = "Basic pay must be zero or more")
    private double basicPay;

    @PositiveOrZero(message = "Allowances must be zero or more")
    private double allowances;

    @PositiveOrZero(message = "Deductions must be zero or more")
    private double deductions;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public double getBasicPay() { return basicPay; }
    public void setBasicPay(double basicPay) { this.basicPay = basicPay; }

    public double getAllowances() { return allowances; }
    public void setAllowances(double allowances) { this.allowances = allowances; }

    public double getDeductions() { return deductions; }
    public void setDeductions(double deductions) { this.deductions = deductions; }
}
