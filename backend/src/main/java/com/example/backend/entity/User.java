package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String role; // Student, Faculty, Admin
    private String dept;
    private String status; // active, suspended, pending
    private String joined;
    private String password;
    private String adminId;
    private String empId;
}
