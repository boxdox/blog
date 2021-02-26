---
title: Redux Checklist
date: 2020-03-15
language: en
tags:
  - redux
---

_PS: I think I'm starting to hate Redux._

## TL;DR
- Write action creators
- Write reducers
- Create the store
- Wire the React Component using connect()
- Map state and dispatch to props

### Directory Structure
```
src
    |- store
       |- actions
          |- index.js
          |- otherActions.js
       |- reducers
          |- index.js
          |- otherReducers.js
       store.js
```

### Action Creators
I prefer action creators (a function that returns
an action or a JS Object) to actions. Write action creators in this way:

```js
export const getData = data => (
    {
        type: "FETCH_DATA_FROM_API",
        payload: data
    }
)
```

### Reducers
Each reducer is written in its own file. Example: `dataReducer.js`

```js
export const dataReducer = (state = [], action) {
    switch(action.type) {
        // Do Something
    }
}
// ...
export default dataReducer
```

and a `index.js` combines all reducers into `rootReducer`

```js
import { combineReducers } from 'redux'
import dataReducer from './dataReducer'

const rootReducer = combineReducers({
    data: dataReducer,
    // other reducers
})

export default rootReducer
```

### Store 
`store.js` can be created in root of `store` directory:

```js
import { createStore } from 'redux'
import rootReducer from './reducers'

// Import and pass on any middlewares.
const store = createStore(rootReducer)

export default store
```

### Connect store to React
You can use `Provider` wherever you want, I like to 
place it in `index.js` of the root of React project.

```jsx {2, 4, 8-10}
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
// Other imports

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### Finally, connect component to Redux store
Write the `mapStateToProps` and `mapDispatchToProps`:

```jsx
import { connect } from 'redux';
// Import your action creators here
import { getData } from './actions/dataActions';

const SomeComponentName = props => {
    // Do some stuff
}

const mapStateToProps = state => {
    return {
        data: state.data;
        // Other things to map
    }
}

const mapDispatchToProps = dispatch => {
    fetchData: () => dispatch(getData()),
    setData: data => dispatch(setData(data)),
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(SomeComponentName)
```