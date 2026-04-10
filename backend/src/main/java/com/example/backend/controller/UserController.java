package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repo;

    @GetMapping
    public List<User> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User create(@RequestBody User user) { return repo.save(user); }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User updated) {
        return repo.findById(id).map(u -> {
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        String email = creds.get("email");
        String password = creds.get("password");
        String adminId = creds.get("adminId");
        String empId = creds.get("empId");

        return repo.findByEmail(email)
            .filter(u -> password.equals(u.getPassword()))
            .filter(u -> adminId == null || adminId.equals(u.getAdminId()))
            .filter(u -> empId == null || empId.equals(u.getEmpId()))
            .map(u -> ResponseEntity.ok(Map.of(
                "id", u.getId(), "name", u.getName(),
                "role", u.getRole(), "dept", u.getDept(),
                "email", u.getEmail() != null ? u.getEmail() : ""
            )))
            .orElse(ResponseEntity.status(401).build());
    }
}
