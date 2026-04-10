package com.example.backend.controller;

import com.example.backend.entity.Attendance;
import com.example.backend.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceRepository repo;

    @GetMapping
    public List<Attendance> getAll() { return repo.findAll(); }

    @GetMapping("/subject/{code}")
    public List<Attendance> getBySubject(@PathVariable String code) { return repo.findBySubjectCode(code); }

    @GetMapping("/student/{roll}")
    public List<Attendance> getByStudent(@PathVariable String roll) { return repo.findByStudentRoll(roll); }

    @GetMapping("/subject/{code}/date/{date}")
    public List<Attendance> getBySubjectAndDate(@PathVariable String code, @PathVariable String date) {
        return repo.findBySubjectCodeAndDate(code, LocalDate.parse(date));
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance attendance) { return repo.save(attendance); }

    @PostMapping("/bulk")
    public List<Attendance> bulkSave(@RequestBody List<Attendance> records) { return repo.saveAll(records); }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> update(@PathVariable Long id, @RequestBody Attendance updated) {
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
