export const getConfigORM = () => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'chewie',
  password: '12345678',
  database: 'postgres',
  entities: ['src/entity/*.ts'],
  logging: false,
  synchronize: true,
});
