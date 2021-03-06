import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import layout from 'pages/layout/reducer';

const enhancers = [applyMiddleware(thunk)];

if(process.env.NODE_ENV === "development" && window && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
}

const enhancer = compose(
  ...enhancers
);

const rootReducer = combineReducers({
  layout
});

const app = createStore(rootReducer, enhancer);

export default app;