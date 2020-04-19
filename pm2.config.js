module.exports = {
  apps: [
    {
      name: 'coderhood_api',
      script: 'build/server.js',
      node_args: '-r dotenv/config',
    },
  ],
};
