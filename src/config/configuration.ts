import { IAppConfig } from 'src/interface/config';

export default (): IAppConfig => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_USER_ACCESS_TOKEN_EXP_TIME: '60s',
  ADMIN_USER_REFRESH_TOKEN_EXP_TIME: '7d',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
});
