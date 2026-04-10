package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "feedbacks")
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String authorName;
    private String authorEmail;
    private String authorRole;   // Student, Faculty
    private String category;     // Academic, Infrastructure, Teaching, General, Other
    private String rating;       // 1-5
    @Column(length = 5000)
    private String message;
    private String date;
    private Boolean anonymous;
}
