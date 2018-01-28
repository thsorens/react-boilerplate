//to use
//@startup(props => props.start(props.type))

import React from 'react';
import Store from 'store';

const startup = (WrappedComponent, action) => {

  return class StartupComponent extends React.Component {

    constructor(props) {
      super(props);
      this.initialized = false;
    }

    componentDidMount() {

      if(typeof action === "function") {
        action(this.props);
        this.initialized = true;
        this.forceUpdate();
      } else if (typeof action === "string") {
        Store.dispatch({ type: action});
        this.initialized = true;
        this.forceUpdate();
      } else {
        this.initialized = true;
        this.forceUpdate();
      }
    }

    render() {
      if(!this.initialized) {
        return <div />;
      }

      return (<WrappedComponent {...this.props} />);
    }
  }
}

export default (action) => {

  if(typeof action !== "function" && typeof action !== "string") {
        /*eslint-disable*/
        console.error("No valid startup action provided. Action must either be a function or string");
        /*eslint-enable*/
  }

  return (WrappedComponent) => startup(WrappedComponent, action);
}