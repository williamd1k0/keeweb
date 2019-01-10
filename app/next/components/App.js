import React, { Component } from 'react';
import BetaWarning from './BetaWarning';

class App extends Component {
    render() {
        return <div className="app th-fb">
            <BetaWarning/>
            Hello, world!
        </div>;
    }
}

export default App;
