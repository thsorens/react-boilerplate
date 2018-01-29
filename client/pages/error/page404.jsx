import React, {PureComponent} from 'react';
import {Alert} from 'reactstrap';

export default class Page404 extends PureComponent {
  render(){
    return(
      <div>
        <Alert>
          <h3>Page not found</h3>
        </Alert>
      </div>
    );
  }
}