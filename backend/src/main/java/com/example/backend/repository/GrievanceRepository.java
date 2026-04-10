package com.example.backend.repository;

import com.example.backend.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    List<Grievance> findByStudentRoll(String studentRoll);
    List<Grievance> findByStatus(String status);
}
