package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "assignments")
@Data
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subject;
    private String type; // Assignment, Lab, Project, Quiz
    private Integer marks;
    private String deadline;
    private Integer submitted;
    private Integer total;
    private Integer graded;
    private String color;
}
