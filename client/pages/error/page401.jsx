import React, {PureComponent} from 'react';
import {Alert} from 'react-bootstrap';

export default class Page401 extends PureComponent {
  render(){
    return(
      <div>
        <Alert bsStyle="danger">
          <h3>You do not have access to this page</h3>
        </Alert>
      </div>
    );
  }
}