package com.citizencarepoint.backend.salaryslip;

import com.citizencarepoint.backend.salaryslip.dto.SalarySlipRequest;
import com.citizencarepoint.backend.salaryslip.dto.SalarySlipResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Sits between the Controller (HTTP concerns) and the Repository
 * (database concerns). This is where business rules live — right now
 * that's just "compute net pay," but this is the natural place to add
 * real payroll rules later (tax slabs, statutory deductions, etc.)
 * without touching the controller or the database layer at all.
 */
@Service
public class SalarySlipService {

    private final SalarySlipRepository repository;

    public SalarySlipService(SalarySlipRepository repository) {
        this.repository = repository;
    }

    public SalarySlipResponse create(SalarySlipRequest request) {
        SalarySlip slip = new SalarySlip(
                request.getName(),
                request.getMonth(),
                request.getBasicPay(),
                request.getAllowances(),
                request.getDeductions()
        );
        SalarySlip saved = repository.save(slip);
        return SalarySlipResponse.from(saved);
    }

    public List<SalarySlipResponse> findAll() {
        return repository.findAllByOrderByGeneratedAtDesc()
                .stream()
                .map(SalarySlipResponse::from)
                .toList();
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("No salary slip found with id " + id);
        }
        repository.deleteById(id);
    }
}
