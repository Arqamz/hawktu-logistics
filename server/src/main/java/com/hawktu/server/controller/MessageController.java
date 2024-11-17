package com.hawktu.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.model.Message;
import com.hawktu.server.repository.MessageRepository;

@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @GetMapping("/message")
    public Message getMessage() {
        return messageRepository.findById(1L).orElse(new Message("Hello, World!"));
    }
}
