package com.citizencarepoint.backend.salaryslip;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * No implementation needed — Spring Data JPA generates one at runtime
 * based on this interface. JpaRepository already gives us save(),
 * findById(), findAll(), deleteById(), etc. for free.
 *
 * findAllByOrderByGeneratedAtDesc() follows Spring Data's method-naming
 * convention: Spring parses the method name itself and builds the query
 * (here: "SELECT * FROM salary_slips ORDER BY generated_at DESC") —
 * no SQL or annotations required for a query this simple.
 */
public interface SalarySlipRepository extends JpaRepository<SalarySlip, Long> {

    List<SalarySlip> findAllByOrderByGeneratedAtDesc();
}
