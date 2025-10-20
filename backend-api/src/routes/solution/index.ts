/**
 * @fileoverview Solution routes configuration
 * Defines and registers solution-related endpoints
 */
import { FastifyInstance } from 'fastify';
import {
  createSolutionHandler,
  getSolutionsHandler,
  getSolutionByIdHandler,
  deleteSolutionHandler,
} from './handlers';
import { 
  createSolutionSchema,
  getSolutionsSchema,
  getSolutionByIdSchema,
  deleteSolutionSchema,
} from './schema';
import { validateObjectId } from 'utils/validation';

/**
 * Configures solution routes for the Fastify instance
 *
 * @example
 * // Usage in Fastify server setup
 * fastify.register(solutionRoutes, { prefix: '/solution' })
 *
 * @description Registers the following endpoints:
 * - POST /create: Create a new solution
 * - GET /: Get all solutions
 * - GET /:id: Get a solution by ID
 * - DELETE /:id: Delete a solution by ID
 */
export default async function solutionRoutes(fastify: FastifyInstance) {
    fastify.post('/create', { schema: createSolutionSchema }, createSolutionHandler);

    fastify.get('/', { schema: getSolutionsSchema }, getSolutionsHandler);
    
    fastify.get('/:id', { 
        schema: getSolutionByIdSchema,
        preHandler: validateObjectId
    }, getSolutionByIdHandler);

    fastify.delete('/:id', { 
        schema: deleteSolutionSchema,
        preHandler: validateObjectId
    }, deleteSolutionHandler);
}