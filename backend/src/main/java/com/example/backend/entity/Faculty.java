package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "faculty")
@Data
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String empId;
    private String email;
    private String dept;
    private String designation;
    private String subjects;
    private String status; // active, on-leave
    private String color;
}
