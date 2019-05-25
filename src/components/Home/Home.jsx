import React, { Component } from 'react';
import './Home.css';
export class HomeComponent extends Component {
    state = {
        x : 23,
        toChange: 0
    }
    
    render() {
        return (<div className="container">
            Value is {this.state.x}
            <br />
            <input type="number" onChange={(event) => this.changeSecondVariable(event)}/>
            &nbsp;
            <button onClick={this.changeValue}>Click To Change</button>
        </div>)
    }

    changeValue = () => {
        this.setState({x:this.state.toChange})
    }

    changeSecondVariable = (evt) => {
        var y = evt.target.value;
        this.setState({ toChange: y }, () => {
            console.log(this.state.toChange);
        });
    }
}
