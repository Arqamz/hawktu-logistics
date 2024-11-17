package com.hawktu.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hawktu.server.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    // Additional custom query methods can be defined here if needed
}
