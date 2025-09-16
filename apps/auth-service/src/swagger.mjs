import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Auth Service API',
    description: 'API documentation for the authentication service',
  },
  host: 'localhost:6001',
  basePath: '/api',
  schemes: ['http'],
};

// Define the output file path relative to the project root
const outputFile = './swagger-output.json';

// Define the endpoints files relative to the project root
const endpointsFiles = ['./routes/auth.router.ts'];

// Generate the Swagger documentation
swaggerAutogen( )(outputFile, endpointsFiles, doc);
