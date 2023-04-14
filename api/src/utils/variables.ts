export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
export const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
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
export const POSTGRES_USER = process.env.POSTGRES_USER ?? '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '';
export const POSTGRES_DB = process.env.POSTGRES_DB ?? '';
