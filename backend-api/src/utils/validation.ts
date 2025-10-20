/**
 * @fileoverview Validation utilities for request data
 * Provides common validation functions for API endpoints
 */

import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Validates if a string is a valid MongoDB ObjectId
 * @param id - The string to validate
 * @returns boolean indicating if the string is a valid ObjectId
 */
export function isValidObjectId(id: string): boolean {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
}

/**
 * Middleware to validate MongoDB ObjectId in request parameters
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 * @param done - Fastify done callback
 */
export function validateObjectId(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
  done: () => void
) {
  const { id } = request.params;
  
  if (!isValidObjectId(id)) {
    reply.code(400).send({ error: 'ID inválido' });
    return;
  }
  
  done();
}

/**
 * Sanitizes and validates string input
 * @param input - The string to sanitize
 * @returns The sanitized string or null if invalid
 */
export function sanitizeString(input: string | undefined): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }
  
  const sanitized = input.trim();
  return sanitized.length > 0 ? sanitized : null;
}

/**
 * Validates email format
 * @param email - The email to validate
 * @returns boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
