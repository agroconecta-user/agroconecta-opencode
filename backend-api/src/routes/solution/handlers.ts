/**
 * @fileoverview Solution route handlers for creating, updating, and deleting solutions
 * Implements request handling for solution management endpoints
*/
import { GetSolutionsRequest } from 'routes/solution/solution.types';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
    createSolution,
    deleteSolution,
    getSolutions,
    getSolutionById,
} from 'controllers/solutionController';
import {
    CreateSolutionRequest,
} from './solution.types';

/**
 * Handles solution retrieval requests
 */
export async function getSolutionsHandler(
    request: FastifyRequest<{ Querystring: GetSolutionsRequest }>,
    reply: FastifyReply,
) {
    try {
        const solutions = await getSolutions(request.query);
        reply.code(200).send(solutions);
    } catch (error) {
        reply.code(500).send({ error: error.message });
    }
}

/**
 * Handles solution retrieval requests
 */
export async function getSolutionByIdHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
) {
    try {
        const solution = await getSolutionById(request.params.id);
        if (!solution) {
            reply.code(404).send({ error: 'Solução não encontrada' });
            return;
        }
        reply.code(200).send(solution);
    } catch (error) {
        reply.code(500).send({ error: error.message });
    }
}

/**
 * Handles solution creation requests
*/
export async function createSolutionHandler(
    request: FastifyRequest<{ Body: CreateSolutionRequest, Headers: { authorization: string } }>,
    reply: FastifyReply,
) {
    const adminToken = request.headers.authorization?.split('Bearer ')[1];
    if (!adminToken) {
        reply.code(401).send({ error: 'Token de autorização não fornecido' });
        return;
    }

    try {
        const solution = await createSolution(request.body, adminToken);
        reply.code(201).send(solution);
    } catch (error) {
        reply.code(400).send({ error: error.message });
    }
}

/**
 * Handles solution deletion requests
 */
export async function deleteSolutionHandler(
    request: FastifyRequest<{ Params: { id: string }, Headers: { authorization: string } }>,
    reply: FastifyReply,
) {
    const adminToken = request.headers.authorization?.split('Bearer ')[1];
    if (!adminToken) {
        reply.code(401).send({ error: 'Token de autorização não fornecido' });
        return;
    }
    try {
        await deleteSolution(request.params.id, adminToken);
        reply.code(204).send();
    } catch (error) {
        if (error.message.includes('não encontrada')) {
            reply.code(404).send({ error: error.message });
        } else {
            reply.code(500).send({ error: error.message });
        }
    }
}