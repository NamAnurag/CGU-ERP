package com.example.backend.repository;

import com.example.backend.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findBySubjectCodeAndExamType(String subjectCode, String examType);
    List<Mark> findByStudentRoll(String studentRoll);
}
