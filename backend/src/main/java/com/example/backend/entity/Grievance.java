package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "grievances")
@Data
public class Grievance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticketId;
    private String studentRoll;
    private String title;
    @Column(length = 2000)
    private String description;
    private String category; // Attendance, Marks, Assignments, Fee, Facilities, Other
    private String priority; // low, medium, high
    private String status; // open, in-progress, resolved
    private String date;
}
