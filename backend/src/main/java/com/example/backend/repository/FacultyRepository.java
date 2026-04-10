package com.example.backend.repository;

import com.example.backend.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    List<Faculty> findByDept(String dept);
    List<Faculty> findByStatus(String status);
}
