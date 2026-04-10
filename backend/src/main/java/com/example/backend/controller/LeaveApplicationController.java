package com.example.backend.controller;

import com.example.backend.entity.LeaveApplication;
import com.example.backend.repository.LeaveApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveApplicationController {

    private final LeaveApplicationRepository repo;

    @GetMapping
    public List<LeaveApplication> getAll() { return repo.findAll(); }

    @GetMapping("/faculty/{empId}")
    public List<LeaveApplication> getByFaculty(@PathVariable String empId) {
        return repo.findByFacultyEmpId(empId);
    }

    @PostMapping
    public LeaveApplication create(@RequestBody LeaveApplication leave) {
        leave.setStatus("pending");
        return repo.save(leave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveApplication> update(@PathVariable Long id, @RequestBody LeaveApplication updated) {
        return repo.findById(id).map(l -> {
            updated.setId(id);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveApplication> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return repo.findById(id).map(l -> {
            l.setStatus(body.get("status"));
            return ResponseEntity.ok(repo.save(l));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
