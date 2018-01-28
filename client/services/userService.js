'use strict';
import Config from '../config';
import AbstractService from './abstractService';

const urls = {
  getCurrentUser: "Account/CurrentUser"
};

class UserService extends AbstractService {
  constructor() {
    super(Config.runtime.urls.apiBaseUrl, "application/json");
  }

  getCurrentUser(){
    return this.json(urls.getCurrentUser);    
  }

}

module.exports = UserService;
