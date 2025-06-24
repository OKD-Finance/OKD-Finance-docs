import fs from 'fs';
import path from 'path';

const swaggerFiles = [
    '/home/timofvy/Projects/OKD-Finance/Backend/swagger/genesis/swagger.json',
    '/home/timofvy/Projects/OKD-Finance/Backend/swagger/gateway/swagger.json',
    '/home/timofvy/Projects/OKD-Finance/Backend/swagger/extgateway/swagger.json',
    '/home/timofvy/Projects/OKD-Finance/Backend/swagger/admin/swagger.json',
];

let mergedSwagger = {
    swagger: "2.0",
    info: {
        title: "OKD Finance Unified API",
        version: "1.0.0",
        description: "Unified API documentation for OKD Finance Exchange"
    },
    host: "api.okd.finance", // Assuming a common host or using the main gateway host
    basePath: "/api",
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {},
    definitions: {},
    securityDefinitions: {} // To collect security definitions
};

swaggerFiles.forEach(filePath => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const swaggerSpec = JSON.parse(data);

        // Merge paths
        Object.assign(mergedSwagger.paths, swaggerSpec.paths);

        // Merge definitions
        Object.assign(mergedSwagger.definitions, swaggerSpec.definitions);

        // Merge securityDefinitions if present (Swagger 2.0)
        if (swaggerSpec.securityDefinitions) {
            Object.assign(mergedSwagger.securityDefinitions, swaggerSpec.securityDefinitions);
        }

        // Update info with a general description
        if (swaggerSpec.info && swaggerSpec.info.title && swaggerSpec.info.title !== "Coin market cap API.") {
            mergedSwagger.info.description += `\n${swaggerSpec.info.title} at ${swaggerSpec.host || ''}${swaggerSpec.basePath || ''}`;
        }

    } catch (error) {
        console.error(`Error reading or parsing ${filePath}:`, error);
    }
});

const outputPath = 'docs/public/swagger-ui/swagger.json';
fs.writeFileSync(outputPath, JSON.stringify(mergedSwagger, null, 2), 'utf8');
console.log(`Merged Swagger JSON written to ${outputPath}`); 