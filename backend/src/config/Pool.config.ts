import { envConfig } from './envConfig';

const Pool = {
  host: envConfig.MYSQL_HOST ?? 'localhost',
  user: envConfig.MYSQL_USER,
  password: envConfig.MYSQL_PASSWORD,
  database: envConfig.MYSQL_DATABASE,
  port: envConfig.MYSQL_PORT,
  multipleStatements: true
};

export default Pool;
