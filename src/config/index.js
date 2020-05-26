import dotenv from 'dotenv';

const foundEnv = dotenv.config();
if (foundEnv.error) {
  throw new Error(' .env file not found ❗');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
export default {
  DB_URL: process.env.DB_URL,
  port: process.env.PORT,
  JwtKey: process.env.jwtPrivateKey,
  NODE_ENV: process.env.NODE_ENV
};
