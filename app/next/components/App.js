import React, { Component } from 'react';
import BetaWarning from './BetaWarning';

class App extends Component {
    render() {
        return <div className="app th-fb">
            <BetaWarning/>
        </div>;
    }
}

export default App;
