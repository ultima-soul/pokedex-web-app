import { Handler } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt: Handler = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

export default checkJwt;
