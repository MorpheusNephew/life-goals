export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
export const AUTH0_TOKEN_SIGNING_ALG = process.env.AUTH0_TOKEN_SIGNING_ALG;
export const AUTH0_MANAGEMENT_DOMAIN =
  process.env.AUTH0_MANAGEMENT_DOMAIN ?? '';
export const AUTH0_MANAGEMENT_CLIENT_ID =
  process.env.AUTH0_MANAGEMENT_CLIENT_ID;
export const AUTH0_MANAGEMENT_CLIENT_SECRET =
  process.env.AUTH0_MANAGEMENT_CLIENT_SECRET;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID;
export const LOCAL_DEV = process.env.LOCAL_DEV?.toLowerCase() === 'true';
export const MONGO_DB_USER = process.env.MONGO_DB_USER ?? '';
export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD ?? '';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME ?? '';
