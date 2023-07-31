const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/index.js']

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pet Log API',
    description: 'Pet Log API',
  },
  securityDefinitions: {
      bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
      }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc)