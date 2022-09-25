declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
  }
}
