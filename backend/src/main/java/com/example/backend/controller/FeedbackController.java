package com.example.backend.controller;

import com.example.backend.entity.Feedback;
import com.example.backend.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackRepository repo;

    // Admin — sees everything
    @GetMapping
    public List<Feedback> getAll() { return repo.findAll(); }

    // Admin — filter by role
    @GetMapping("/role/{role}")
    public List<Feedback> getByRole(@PathVariable String role) {
        return repo.findByAuthorRole(role);
    }

    // Faculty — sees only Student feedbacks
    @GetMapping("/students")
    public List<Feedback> getStudentFeedbacks() {
        return repo.findByAuthorRole("Student");
    }

    // Own feedbacks
    @GetMapping("/my/{email}")
    public List<Feedback> getMine(@PathVariable String email) {
        return repo.findByAuthorEmail(email);
    }

    @PostMapping
    public Feedback create(@RequestBody Feedback feedback) {
        feedback.setDate(LocalDate.now().toString());
        if (feedback.getAnonymous() == null) feedback.setAnonymous(false);
        return repo.save(feedback);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
