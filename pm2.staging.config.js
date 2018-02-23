module.exports = {
    apps: [
      {
        name: 'async-node-cli',
        script: './dist/app.js',
        env: {   // all environment
          'NODE_ENV': 'staging'
        },
        //'instances': 'fork',   // 如果是fork, 不用配置
        'exec_mode': 'fork'  // cluster or fork
      }
    ]
  }
  