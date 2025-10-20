import { FastifyRequest, FastifyReply } from 'fastify';
import {
    AuthAdmin,
} from 'controllers/authController';
import {
    AuthAdminRequest,
} from './auth.types';

export async function AuthAdminHandler(
    request: FastifyRequest<{ Body: AuthAdminRequest }>,
    reply: FastifyReply,
) {
    try {
        const solution = await AuthAdmin(request.body);
        reply.code(201).send(solution);
    } catch (error) {
        reply.code(400).send({ error: error.message });
    }
}
