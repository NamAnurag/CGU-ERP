package com.example.backend.repository;

import com.example.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findBySubjectCode(String subjectCode);
    List<Attendance> findByStudentRoll(String studentRoll);
    List<Attendance> findBySubjectCodeAndDate(String subjectCode, LocalDate date);
}
