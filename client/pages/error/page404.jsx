import React, {PureComponent} from 'react';
import {Alert} from 'react-bootstrap';

export default class Page404 extends PureComponent {
  render(){
    return(
      <div>
        <Alert bsStyle="danger">
          <h3>Page not found</h3>
        </Alert>
      </div>
    );
  }
}