/**
 * @fileoverview Rate limiting middleware for API protection
 * Provides basic rate limiting functionality to prevent abuse
 */

import { FastifyRequest, FastifyReply } from 'fastify';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // 100 requests per window

/**
 * Rate limiting middleware
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 * @param done - Fastify done callback
 */
export function rateLimiter(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const clientId = request.ip || 'unknown';
  const now = Date.now();
  
  // Clean up expired entries
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
  
  // Get or create client record
  if (!store[clientId]) {
    store[clientId] = {
      count: 0,
      resetTime: now + WINDOW_MS
    };
  }
  
  // Check if window has reset
  if (store[clientId].resetTime < now) {
    store[clientId] = {
      count: 0,
      resetTime: now + WINDOW_MS
    };
  }
  
  // Increment request count
  store[clientId].count++;
  
  // Check if limit exceeded
  if (store[clientId].count > MAX_REQUESTS) {
    reply.code(429).send({
      error: 'Too many requests',
      retryAfter: Math.ceil((store[clientId].resetTime - now) / 1000)
    });
    return;
  }
  
  // Add headers
  reply.header('X-RateLimit-Limit', MAX_REQUESTS);
  reply.header('X-RateLimit-Remaining', MAX_REQUESTS - store[clientId].count);
  reply.header('X-RateLimit-Reset', store[clientId].resetTime);
  
  done();
}
