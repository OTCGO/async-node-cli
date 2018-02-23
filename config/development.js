module.exports = {
    db: {
      url: 'mongodb://127.0.0.1:27017/async-test-node',
      options: {
      },
      debug: true
    },
    rpc: 'http://future.otcgo.cn:5000/testnet/node',
    workerCount: 1,
    log: {
      appenders: { neo: { type: 'file', filename: 'neo.log' } },
      categories: { default: { appenders: ['neo'], level: 'info' } }
    }
  }
  