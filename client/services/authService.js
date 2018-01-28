'use strict';
import Config from '../config';
import AbstractService from './abstractService';

const urls = {
  login: 'token'
};

export default class AuthService extends AbstractService {
  constructor() {
    super(Config.runtime.urls.apiBase, "application/x-www-form-urlencoded");
  }
  login(username, password) {
    const data = {
      grant_type: "password",
      username: username,
      password: password
    }
    return this.postForm(urls.login, null, data);
  }
}