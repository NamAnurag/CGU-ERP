package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "marks")
@Data
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentRoll;
    private String studentName;
    private String subjectCode;
    private String examType; // Internal, Mid-Term, End-Term
    private Integer marks;
    private Integer maxMarks;
}
