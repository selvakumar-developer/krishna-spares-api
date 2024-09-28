import { IAppConfig } from 'src/interface/config';

export default (): IAppConfig => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});
