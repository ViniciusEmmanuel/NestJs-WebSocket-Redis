export const environment = () => ({
  port: parseInt(String(process.env.PORT), 10) || 7777,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(String(process.env.REDIS_PORT), 10) || 6379,
  },
  JWT_HAST: process.env.JWT_HASH,
});
