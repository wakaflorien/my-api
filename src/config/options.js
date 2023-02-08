export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'A simple Express Blog API',
    },
    servers: [
      {
        url: 'http://localhost:7070/',
        description: 'Development server',
      },
      {
        url: 'https://ruby-angry-antelope.cyclic.app/',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.js',
    './src/routes/api/*.js',
    './src/routes/auth/*.js',
  ],
};
