import React, {Component} from "react";
import classNames from 'classnames';
import {login} from "./actions";
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

@connect(
  state => ({
    loginState: state.user.login,
    loading: state.user.loadingLogin,
    user: state.user
  }), 
  dispatch => ({
    login: (username, password) => dispatch(login(username, password))
  })
)
export default class Login extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loginState: PropTypes.object,
    login: PropTypes.func.isRequired,
    history: PropTypes.object,
    user: PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      forgotPassword: false,
      loading: false
    }
  }
  login(ev) {
    ev.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
  handleEmail(ev) {
    this.setState({email: ev.target.value, error: false});
  }
  handlePassword(ev) {
    this.setState({password: ev.target.value, error: false});
  }
  renderError() {
    if (this.props.loginState.error) {
      return (
        <span className="fg-red">{this.props.loginState.caption}</span>
      );
    }
    return null;
  }
  forgotPassword() {
    this.props.history.push('/ForgotPassword');
  }
  render() {
    const emailClass = classNames("form-group", {"has-error": this.props.loginState.error});
    return (
      <div>
        {this.props.user.auth ? <Redirect to="/" /> : null}
        <div id="login">
          <form className="form-horizontal" key="loginForm" method="post" onSubmit={(ev) => this.login(ev)}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>
                  Sign in
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className={emailClass}>
                        <label htmlFor="username" className="control-label col-sm-2">Username</label>
                        <div className="col-sm-8">
                          <input id="username" type="text" className="form-control" name="username" placeholder="Username/Email" onChange={(ev) => this.handleEmail(ev)}
                                value={this.state.email}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className={emailClass}>
                        <label htmlFor="password" className="control-label col-sm-2">Password</label>
                        <div className="col-sm-8">
                          <input id="password" type="password" className="form-control" name="password" placeholder="Enter password" onChange={(ev) => this.handlePassword(ev)}
                                value={this.state.password}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.renderError()}
              </Modal.Body>
              <Modal.Footer>
                <button className="clearleft btn-primary" type="submit" >Login </button>            
              </Modal.Footer>
            </Modal.Dialog>
          </form>
        </div>
      </div>
    );
  }
}