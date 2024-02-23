const RestProxy = require('sp-rest-proxy');
const settings = {
    configPath : './app.cred.json',
    port : 4323,
    staticRoot : './static'
};

const restProxy = new RestProxy(settings);
restProxy.serveProxy();