import { FastifySchema } from 'fastify';

const headers: FastifySchema['headers'] = {
  type: 'object',
  properties: {
    authorization: { type: 'string', description: 'Bearer token' },
  },
};

export const createSolutionSchema = {
  headers,
  body: {
    type: 'object',
    required: ['title', 'category', 'description'] as string[],
    properties: {
      title: { 
        type: 'string',
        minLength: 1,
        maxLength: 200
      },
      description: { 
        type: 'string',
        minLength: 1,
        maxLength: 2000
      },
      category: { 
        type: 'string', 
        enum: ['product', 'service', 'scientific_article', 'machinery', 'irrigation'] 
      },
      subcategory: { type: 'string' },
      priceDollar: { 
        type: 'number',
        minimum: 0
      },
      link: { 
        type: 'string',
        format: 'uri'
      },
      publishDate: { 
        type: 'string', 
        format: 'date-time' 
      },
      starRating: { 
        type: 'number',
        minimum: 0,
        maximum: 5
      },
      dataColeta: { type: 'string' },
      ownerContact: {
        type: 'object',
        required: [] as string[],
        additionalProperties: false,
        properties: {
          email: { type: 'string' },
          phone: { type: 'string' },
          other: { type: 'string', maxLength: 500 },
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        subcategory: { type: 'string' },
        details: { type: 'string' },
        priceDollar: { type: 'number' },
        link: { type: 'string' },
        publishDate: { type: 'string' },
        dataColeta: { type: 'string' },
        starRating: { type: 'number' },
        ownerContact: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            phone: { type: 'string' },
            other: { type: 'string' },
          },
        },
        createdAt: { type: 'string' },
      },
    },
  },
};

export const getSolutionsSchema = {
  querystring: {
    type: 'object',
    required: [] as string[],
    properties: {
      category: { type: 'string', enum: ['product', 'service', 'scientific_article', 'machinery', 'irrigation'] },
      subcategory: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          category: { type: 'string' },
          subcategory: { type: 'string' },
          details: { type: 'string' },
          dataColeta: { type: 'string' },
          priceDollar: { type: 'number' },
          link: { type: 'string' },
          publishDate: { type: 'string' },
          starRating: { type: 'number' },
          ownerContact: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              phone: { type: 'string' },
              other: { type: 'string' },
            },
          },
          createdAt: { type: 'string' },
        },
      },
    },
  },
};

export const getSolutionByIdSchema = {
  params: {
    type: 'object',
    required: ['id'] as string[],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        subcategory: { type: 'string' },
        details: { type: 'string' },
        dataColeta: { type: 'string' },
        priceDollar: { type: 'number' },
        link: { type: 'string' },
        publishDate: { type: 'string' },
        starRating: { type: 'number' },
        ownerContact: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            phone: { type: 'string' },
            other: { type: 'string' },
          },
        },
        createdAt: { type: 'string' },
      },
    },
  },
};

export const deleteSolutionSchema = {
  headers,
  params: {
    type: 'object',
    required: ['id'] as string[],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
