declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    CLIENT_ORIGIN_URL: string;
    AUDIENCE: string;
    ISSUER_BASE_URL: string;
  }
}
