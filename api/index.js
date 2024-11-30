const { app, initialize } = require('../server');

initialize().catch(console.error);


module.exports = app;