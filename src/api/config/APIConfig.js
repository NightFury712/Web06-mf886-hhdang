var APIConfig = {
  // development: 'http://cukcuk.manhnv.net',
  development: 'https://localhost:44334',
  production: 'https://localhost:44361'
}

export default APIConfig[process.env.NODE_ENV];