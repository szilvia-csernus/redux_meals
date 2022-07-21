import { Component } from "react";

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = { hasError: false }
    }

    // by adding 'componentDidCatch' lifecycle method makes the compnent 
    // an error boundary which can be used as a wrapper.
    componentDidCatch(error) {
        console.log(error)
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong!</p>
        }
        return <p>{this.props.children}</p>
        
    }
}

export default ErrorBoundary