package com.example.backend.controller;

import com.example.backend.entity.Grievance;
import com.example.backend.repository.GrievanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grievances")
@RequiredArgsConstructor
public class GrievanceController {

    private final GrievanceRepository repo;

    @GetMapping
    public List<Grievance> getAll() { return repo.findAll(); }

    @GetMapping("/student/{roll}")
    public List<Grievance> getByStudent(@PathVariable String roll) { return repo.findByStudentRoll(roll); }

    @PostMapping
    public Grievance create(@RequestBody Grievance grievance) {
        grievance.setStatus("open");
        long count = repo.count();
        grievance.setTicketId("GRV-2026-" + String.format("%04d", count + 1));
        return repo.save(grievance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grievance> update(@PathVariable Long id, @RequestBody Grievance updated) {
        return repo.findById(id).map(g -> {
            updated.setId(id);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Grievance> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return repo.findById(id).map(g -> {
            g.setStatus(body.get("status"));
            return ResponseEntity.ok(repo.save(g));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
