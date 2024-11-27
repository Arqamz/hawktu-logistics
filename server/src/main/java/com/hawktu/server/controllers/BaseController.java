package com.hawktu.server.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hawktu.server.dtos.response.ErrorResponse;

public class BaseController {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    protected ResponseEntity<ErrorResponse> badRequestError(String message) {
        return createErrorResponse(message, HttpStatus.BAD_REQUEST);
    }

    protected ResponseEntity<ErrorResponse> unauthorizedError(String message) {
        return createErrorResponse(message, HttpStatus.UNAUTHORIZED);
    }

    protected ResponseEntity<ErrorResponse> forbiddenError(String message) {
        return createErrorResponse(message, HttpStatus.FORBIDDEN);
    }

    protected ResponseEntity<ErrorResponse> notFoundError(String message) {
        return createErrorResponse(message, HttpStatus.NOT_FOUND);
    }

    protected ResponseEntity<ErrorResponse> internalServerError(String message) {
        return createErrorResponse(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorResponse> createErrorResponse(String message, HttpStatus status) {
        ErrorResponse errorResponse = new ErrorResponse(message, status.value());
        return ResponseEntity.status(status).body(errorResponse);
    }
}
