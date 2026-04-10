package com.example.backend.controller;

import com.example.backend.entity.FeeRecord;
import com.example.backend.entity.PaymentTransaction;
import com.example.backend.repository.FeeRecordRepository;
import com.example.backend.repository.PaymentTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentTransactionController {

    private final PaymentTransactionRepository txnRepo;
    private final FeeRecordRepository feeRepo;

    @GetMapping
    public List<PaymentTransaction> getAll() { return txnRepo.findAll(); }

    @GetMapping("/pending")
    public List<PaymentTransaction> getPending() { return txnRepo.findByStatus("pending"); }

    @GetMapping("/student/{roll}")
    public List<PaymentTransaction> getByStudent(@PathVariable String roll) {
        return txnRepo.findByStudentRoll(roll);
    }

    @PostMapping
    public PaymentTransaction submit(@RequestBody PaymentTransaction txn) {
        txn.setTxnId("TXN" + System.currentTimeMillis());
        txn.setStatus("pending");
        txn.setSubmittedAt(LocalDateTime.now());
        return txnRepo.save(txn);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<PaymentTransaction> approve(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return txnRepo.findById(id).map(txn -> {
            txn.setStatus("approved");
            txn.setReviewedAt(LocalDateTime.now());
            txn.setReviewedBy(body.getOrDefault("reviewedBy", "Finance Team"));
            txnRepo.save(txn);

            // Update fee record
            feeRepo.findByRoll(txn.getStudentRoll()).stream().findFirst().ifPresent(fee -> {
                long newPaid = Math.min(fee.getPaid() + txn.getAmount(), fee.getTotal());
                fee.setPaid(newPaid);
                fee.setDue(Math.max(0, fee.getTotal() - newPaid));
                fee.setStatus(newPaid >= fee.getTotal() ? "paid" : newPaid > 0 ? "partial" : "unpaid");
                feeRepo.save(fee);
            });

            return ResponseEntity.ok(txn);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<PaymentTransaction> reject(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return txnRepo.findById(id).map(txn -> {
            txn.setStatus("rejected");
            txn.setRemarks(body.get("remarks"));
            txn.setReviewedAt(LocalDateTime.now());
            txn.setReviewedBy(body.getOrDefault("reviewedBy", "Finance Team"));
            return ResponseEntity.ok(txnRepo.save(txn));
        }).orElse(ResponseEntity.notFound().build());
    }
}
