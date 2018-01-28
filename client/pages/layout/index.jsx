import React, {PureComponent} from 'react';
import {init} from 'pages/login/actions';

import LoginPage from 'pages/login';

import Page401 from 'pages/error/page401';
import Page404 from 'pages/error/page404';

import Store from 'store';
import {connect} from 'react-redux';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

Store.dispatch(init());

import PropTypes from 'prop-types';

@connect(
  state => ({
    user: state.user
  })
)
export default class WrapRoutes extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  };
  render(){
    return(
      <div>
        <BrowserRouter>        
          <div>            
            <Switch>
              <Route path="/Login" component={LoginPage} />
              {!this.props.user.auth ? <Redirect to="/Login" /> : null }

              <Route path="/401" component={Page401} />
              <Route path="/404" component={Page404} />
                      
              <Route component={Page404} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }  
}