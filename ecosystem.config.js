module.exports = {
  apps: [
    {
      name: 'Comic App',
      exec_mode: 'cluster', // fork or cluster
      instances: '1', // Or a number of instances
      script: '.output/server/index.mjs',
      args: 'start',
      version: '0.0.1',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
