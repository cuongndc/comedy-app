module.exports = {
  apps: [
    {
      name: 'Comic App',
      exec_mode: 'cluster', // fork or cluster
      instances: 'max', // Or a number of instances
      script: '.output/server/index.mjs',
      args: 'start',
    },
  ],
}
