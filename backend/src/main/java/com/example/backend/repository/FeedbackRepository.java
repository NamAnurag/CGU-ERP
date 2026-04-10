package com.example.backend.repository;

import com.example.backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByAuthorRole(String role);
    List<Feedback> findByAuthorEmail(String email);
}
