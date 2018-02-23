module.exports = {
    db: {
      url: 'mongodb://127.0.0.1:27017/async-test-node',
      options: {
      },
      debug: false
    },
    rpc: 'http://127.0.0.1:5000/testnet/node',
    log: {
      appenders: { neo: { type: 'file', filename: 'neo.log' } },
      categories: { default: { appenders: ['neo'], level: 'info' } }
    }
  }
  