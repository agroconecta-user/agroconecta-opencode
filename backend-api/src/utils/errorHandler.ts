/**
 * @fileoverview Global error handler for Fastify application
 * Provides centralized error handling and logging functionality
 */

import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Global error handler function for processing Fastify errors
 * 
 * @param {FastifyError} error - The error object thrown during request processing
 * @param {FastifyRequest} request - The Fastify request object
 * @param {FastifyReply} reply - The Fastify reply object for sending error response
 * 
 * @description
 * Handles errors by:
 * 1. Logging the error using Fastify's built-in logger
 * 2. Sending appropriate HTTP status code (from error or 500)
 * 3. Returning error message in JSON format
 * 
 * @example
 * // Usage in Fastify server setup
 * fastify.setErrorHandler(errorHandler)
 * 
 * // Error response format:
 * // { error: "Error message" }
 */
export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);
  reply.status(error.statusCode || 500).send({ error: error.message });
}
