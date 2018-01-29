import React, {PureComponent} from 'react';
import Page404 from 'pages/error/page404';
import Home from 'pages/home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';

import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';

export default class WrapRoutes extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  };
  render(){
    return(
      <Container>
        <BrowserRouter>        
          <div>            
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={Page404} />
            </Switch>
          </div>
        </BrowserRouter>
      </Container>
    );
  }  
}