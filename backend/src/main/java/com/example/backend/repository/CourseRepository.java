package com.example.backend.repository;

import com.example.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByDept(String dept);
    List<Course> findByStatus(String status);
}
