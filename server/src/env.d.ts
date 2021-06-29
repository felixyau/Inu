declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    PORT: string;
  }
}