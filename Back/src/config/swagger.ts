import swaggerJsdoc from 'swagger-jsdoc'

interface SwaggerOptions {
  definition: {
    openapi: string
    info: {
      title: string
      version: string
      description: string
    }
    servers: [{ url: string }]
  }
  apis: string[]
}

const options: SwaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Meal Planner API Docs',
      version: '1.0.0',
      description: 'Meal Planner API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

export const specs = swaggerJsdoc(options)
