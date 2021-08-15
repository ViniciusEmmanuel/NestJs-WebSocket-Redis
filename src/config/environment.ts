export const environment = () => ({
  port: parseInt(process.env.PORT, 10) || 7777,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
});
