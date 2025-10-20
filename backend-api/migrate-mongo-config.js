const config = {
  mongodb: {
    url: process.env.MONGO_HOST,
    databaseName: process.env.MONGO_DBNAME,
    options: {
      connectTimeoutMS: 3600000,
      socketTimeoutMS: 3600000,
    },
  },
  migrationsDir: 'mongo/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.cjs',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

export default config;
