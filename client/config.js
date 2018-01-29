const devBase = "http://localhost:3492/";
const prodBase = "https://someserver.no/";

const dev = {
  runtime: {
    environment: "DEV",
    apiTimeoutMs: 90000,
    urls: {
      apiBase: devBase,
      apiBaseUrl: devBase + "api/"
    }
  }  
}

const prod = {
  runtime: {
    environment: "PROD",
    apiTimeoutMs: 90000,
    urls: {
      apiBase: prodBase,
      apiBaseUrl: prodBase + "api/"
    }
  }    
}

let env;

switch(process.env.NODE_ENV){  
  case 'development': {
    env = dev;
    break;
  }
  case 'production': {
    env = prod;
    break;
  }
  default:{
    break;
  } 
}

export default env || prod;
