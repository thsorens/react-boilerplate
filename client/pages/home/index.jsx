import React, {PureComponent} from 'react';
import image from 'images/javascript.jpg';

export default class Home extends PureComponent {
  render(){
    return(
      <div>
        <h1>Hello world</h1>
        <img src={image} />
      </div>
    );
  }
}