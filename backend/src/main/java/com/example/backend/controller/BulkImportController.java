package com.example.backend.controller;

import com.example.backend.entity.Student;
import com.example.backend.entity.User;
import com.example.backend.repository.StudentRepository;
import com.example.backend.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bulk")
@RequiredArgsConstructor
public class BulkImportController {

    private final StudentRepository studentRepo;
    private final UserRepository userRepo;

    @PostMapping("/students")
    public ResponseEntity<Map<String, Integer>> bulkImportStudents(@RequestBody List<StudentImportDto> records) {
        String[] colors = {"#4f8ef7","#22d3ee","#10b981","#f59e0b","#ec4899","#f97316","#6366f1","#a855f7"};
        int created = 0;
        for (int i = 0; i < records.size(); i++) {
            StudentImportDto r = records.get(i);
            String email = r.getEmail().toLowerCase().trim();
            String roll = r.getRoll().trim();
            String name = r.getName().trim();

            // skip if user already exists
            if (userRepo.findByEmail(email).isPresent()) continue;

            // create student record
            Student s = new Student();
            s.setName(name);
            s.setRoll(roll);
            s.setEmail(email);
            s.setDept("CSE");
            s.setSem(roll.startsWith("24") ? 2 : roll.startsWith("23") ? 4 : 6);
            s.setCgpa(7.0 + Math.round(Math.random() * 30) / 10.0);
            s.setAttendance(65 + (int)(Math.random() * 30));
            s.setStatus("active");
            s.setColor(colors[i % colors.length]);
            studentRepo.save(s);

            // create login
            User u = new User();
            u.setName(name);
            u.setEmail(email);
            u.setRole("Student");
            u.setDept("CSE");
            u.setStatus("active");
            u.setJoined("Jan 2023");
            u.setPassword("Peeps@69");
            userRepo.save(u);

            created++;
        }
        return ResponseEntity.ok(Map.of("created", created, "total", records.size()));
    }

    @Data
    public static class StudentImportDto {
        private String name;
        private String roll;
        private String email;
    }
}
