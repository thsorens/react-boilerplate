import Request from 'superagent';
import config from '../config';
import Store from 'store';

class AbstractService {

  constructor(baseUrl, acceptContentType, authService) {
    this.baseUrl = baseUrl;
    this.acceptContentType = acceptContentType;
    this.authService = authService;
  }

  json(url, params, options) {
    return this.httpRequest(url, 'get', params, null, options);
  }

  post(url, params, data, options) {
    return this.httpRequest(url, 'post', params, data, options);
  }

  postfile(url, params, data, file) {
    return this.httpRequest(url, 'postFile', params, data, null, file);
  }

  postForm(url, params, data, options) {
    return this.httpRequest(url, 'postForm', params, data, options);
  }

  put(url, params, data) {
    return this.httpRequest(url, 'put', params, data);
  }

  putNoResponse(url, params, data) {
    return this.httpRequest(url, 'put', params, data, {parseRespAsJson: false});
  }

  postNoResponse(url,params,data){
    return this.httpRequest(url, 'post', params, data, {parseRespAsJson: false});
  }

  delete(url, params) {
    return this.httpRequest(url, 'del', params, null, {parseRespAsJson: false});
  }

  httpRequest(url, httpMethod, params, data, options, file) {
    options = options || {};
    if (typeof options.parseRespAsJson === 'undefined') {
      options.parseRespAsJson = true;
    }
    const absoluteUrl = this.baseUrl + url;

    let req;

    if (httpMethod === "postForm") {
      req = Request.post(absoluteUrl)
        .timeout(config.runtime.apiTimeoutMs);

      if (data) {
        Object.keys(data).forEach((key) => {
          req.send(key + "=" + data[key]);
        });
      }

    } else if (httpMethod === "postFile") {
      req = Request.post(absoluteUrl)
        .timeout(config.runtime.apiTimeoutMs)
        .set('Accept', this.acceptContentType);

      req.attach('file', file, file.name);

    } else {
      req = Request[httpMethod](absoluteUrl)
        .timeout(config.runtime.apiTimeoutMs)
        .set('Accept', this.acceptContentType)
    }
    if (data) {
      req.send(data);
    }
    if (params) {
      req.query(params)
    }

    const requestInfo = {
      url: absoluteUrl,
      method: httpMethod
    }

    const token = Store.getState().user.token;
    if (token) {
      req.set("Authorization", "Bearer " + token);
    } else {
      //redirect to login
    }

    return this.sendRequest(req, options, requestInfo);
  }

  sendRequest(req, options, requestInfo) {
    const respParser = options.parseRespAsJson ? e => JSON.parse(e) : e => e;
    const promise = new Promise(function (resolve, reject) {
      req.end(function (err, res) {
        if (err) {
          reject(AbstractService.resolveResponseError(err, options, requestInfo));
        } else if (res.error) {
          reject(AbstractService.resolveResponseError({status: res.status, response: res}, options, requestInfo));
        }
        else {
          try {
            resolve(respParser(res.text));
          } catch (e) {
            reject(AbstractService.resolveParseError(e, res, requestInfo));
          }
        }
      });
    });

    return promise;
  }

  isSuccess(statusCode) {
    return Math.floor(statusCode / 100) === 2;
  }

  isError(statusCode) {
    return !this.isSuccess(statusCode);
  }

  static resolveResponseError(err, options, requestInfo) {
    let status = err.status || 0;
    let error = AbstractService.serviceError(
      requestInfo.method + " to " + requestInfo.url + " failed with status " + status,
      {
        status: status,
        url: requestInfo.url,
        method: requestInfo.method,
        serviceError: true
      });
    if (!err.status || !err.response) {
      // Timeout, network error or other general errors
      return error;
    }
    error.data.text = err.response.text;
    error.data.type = err.response.type;

    if(err.response.text.length === 0){
      return error;
    }

    const errorObj = JSON.parse(err.response.text);
    if (errorObj.error_description) {
      error.data.caption = errorObj.error_description;
      error.data.error = true;
    }

    if (errorObj.ModelState) {
      if (errorObj.ModelState[""]) {
        const errors = errorObj.ModelState[""];
        if (errors.length > 0) {
          error.data.caption = errors[0];
          error.data.error = true;
        }
      }
    }
    if (options.parseRespAsJson && err.response.type.endsWith("json")) {
      try {
        error.data.serverError = JSON.parse(error.data.text);
      } catch (e) {
        e.data = error.data;
        error = e;
        error.parseError = true;
      }
    }
    return error;
  }

  static resolveParseError(err, res, requestInfo) {
    err.data = {
      status: res.status,
      url: requestInfo.url,
      method: requestInfo.method,
      serviceError: true,
      text: res.text,
      type: res.type,
      parseError: true
    };
    return err;
  }

  static serviceError(message, data) {
    let error = new Error(message);
    error.data = data;
    return error;
  }

}

export default AbstractService;
