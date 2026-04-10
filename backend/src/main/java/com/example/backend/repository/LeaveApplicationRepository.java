package com.example.backend.repository;

import com.example.backend.entity.LeaveApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    List<LeaveApplication> findByFacultyEmpId(String facultyEmpId);
    List<LeaveApplication> findByStatus(String status);
}
