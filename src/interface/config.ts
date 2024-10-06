export interface IAppConfig {
  PORT: number;
  MONGO_URL: string;
  JWT_SECRET: string;
  ADMIN_USER_ACCESS_TOKEN_EXP_TIME: string;
  ADMIN_USER_REFRESH_TOKEN_EXP_TIME: string;
  ADMIN_USERNAME: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
}
