package com.example.backend.controller;

import com.example.backend.entity.Mark;
import com.example.backend.repository.MarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@RequiredArgsConstructor
public class MarkController {

    private final MarkRepository repo;

    @GetMapping
    public List<Mark> getAll() { return repo.findAll(); }

    @GetMapping("/subject/{code}/exam/{examType}")
    public List<Mark> getBySubjectAndExam(@PathVariable String code, @PathVariable String examType) {
        return repo.findBySubjectCodeAndExamType(code, examType);
    }

    @GetMapping("/student/{roll}")
    public List<Mark> getByStudent(@PathVariable String roll) { return repo.findByStudentRoll(roll); }

    @PostMapping
    public Mark create(@RequestBody Mark mark) { return repo.save(mark); }

    @PostMapping("/bulk")
    public List<Mark> bulkSave(@RequestBody List<Mark> marks) { return repo.saveAll(marks); }

    @PutMapping("/{id}")
    public ResponseEntity<Mark> update(@PathVariable Long id, @RequestBody Mark updated) {
        return repo.findById(id).map(m -> {
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
