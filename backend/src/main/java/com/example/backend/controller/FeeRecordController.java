package com.example.backend.controller;

import com.example.backend.entity.FeeRecord;
import com.example.backend.repository.FeeRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
public class FeeRecordController {

    private final FeeRecordRepository repo;

    @GetMapping
    public List<FeeRecord> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<FeeRecord> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FeeRecord create(@RequestBody FeeRecord record) { return repo.save(record); }

    @PutMapping("/{id}")
    public ResponseEntity<FeeRecord> update(@PathVariable Long id, @RequestBody FeeRecord updated) {
        return repo.findById(id).map(r -> {
            updated.setId(id);
            updated.setDue(Math.max(0, updated.getTotal() - updated.getPaid()));
            String status = updated.getPaid() >= updated.getTotal() ? "paid"
                    : updated.getPaid() > 0 ? "partial" : "unpaid";
            updated.setStatus(status);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/mark-paid")
    public ResponseEntity<FeeRecord> markPaid(@PathVariable Long id) {
        return repo.findById(id).map(r -> {
            r.setPaid(r.getTotal());
            r.setDue(0L);
            r.setStatus("paid");
            return ResponseEntity.ok(repo.save(r));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{roll}")
    public List<FeeRecord> getByRoll(@PathVariable String roll) { return repo.findByRoll(roll); }
}
