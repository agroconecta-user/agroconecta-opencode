import { FastifyInstance } from 'fastify';
import { AuthAdminHandler } from './handlers';
import { authAdminSchema } from './schema';

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/admin', { schema: authAdminSchema }, AuthAdminHandler);
}