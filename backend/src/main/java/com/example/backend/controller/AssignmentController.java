package com.example.backend.controller;

import com.example.backend.entity.Assignment;
import com.example.backend.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentRepository repo;

    @GetMapping
    public List<Assignment> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Assignment create(@RequestBody Assignment assignment) { return repo.save(assignment); }

    @PutMapping("/{id}")
    public ResponseEntity<Assignment> update(@PathVariable Long id, @RequestBody Assignment updated) {
        return repo.findById(id).map(a -> {
            updated.setId(id);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
