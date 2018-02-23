module.exports = {
    apps: [
      {
        name: 'async-node-cli',
        script: './dist/app.js',
        env: {   // all environment
          'NODE_ENV': 'development'
        },
        'instances': 'fork',   // 如果是fork, 不用配置
        //'exec_mode': 'cluster'  // cluster or fork
      }
    ]
  }
  