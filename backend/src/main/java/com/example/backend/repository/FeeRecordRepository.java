package com.example.backend.repository;

import com.example.backend.entity.FeeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeeRecordRepository extends JpaRepository<FeeRecord, Long> {
    List<FeeRecord> findByStatus(String status);
    List<FeeRecord> findByRoll(String roll);
}
