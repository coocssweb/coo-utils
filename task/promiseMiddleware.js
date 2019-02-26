// defaultProps
// constructor
// componentWillMount
// render
// componentDidMount

// componentWillReceiveProps(nextProps)
// shouldComponentUpdate(prevProps, prevState)
// componentWillUpdate
// render
// componentDidUpdate

// defaultProps
// constructor
// getDerivedStateFromProps
// render
// componentDidMount


// getDerivedStateFromProps
// shouldComponentUpdate(prevProps, prevState)
// render
// getSnapHotBeforeUpdate
// componentDidUpdate(prevProps, prevState, snapshot)

// 函数组件
// 没有生命周期钩子；
// 不能访问this
// 无状态

// React.createClass
// React.render
// React.createPortal
// React.children
// React.createElement
// React.lazy
// React.Suspense
// React.memo
// React.Component
// React.PureComponent

export default ({getState, dispatch}) => (next) => (action) => {
    let {promise, types, ...rest } = action;
    if (!promise) {
        next(...action);
    }

    let [REQUEST, SUCCESS, FAIL] = types;
    next({ type: REQUEST, ...rest });
    promise().then((response) => {
        next({ type: SUCCESS, response, ...rest });
    }, (error) => {
        next({ type: FAIL, response: error, ...rest });
    });
}
