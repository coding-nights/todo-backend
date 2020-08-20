import fastify  from 'fastify';
import dotenv from 'dotenv';
import jwt from 'fastify-jwt';
import { env } from 'process';
import Ajv from 'ajv';

dotenv.config();
const ajv = new Ajv({
    // the fastify defaults (if needed)
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    nullable: true,
    allErrors: true,
    // any other options
    // ...
});

const app = fastify({
    logger: false,
});

app.setValidatorCompiler(({ schema, method, url, httpPart }) => {
    return ajv.compile(schema)
})

app.register(jwt, {
    secret: env.JWT_SECRET
});


export default app;