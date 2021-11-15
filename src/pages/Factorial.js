import React, { Component} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default class Factorial extends Component{
    constructor(props){
        super(props)

        
        this.onChangeN = this.onChangeN.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.didGetResponse = this.didGetResponse.bind(this);
        
        this.state = {
            n : 0,
            factorial : 0,
            didSubmit:false,
            
        }
    }

    onChangeN(e) {
        this.setState({
          n: e.target.value
        })
    }

    onSubmit(e) {
        const toGet = {
            n : this.state.n
          }
          axios
          .post('https://backend-mathcalculations.herokuapp.com/factorial', toGet)
          .then(
              res => {
                  if (typeof res.data === 'string' ){
                    this.setState({
                        factorial: 0,
                        didSubmit : true
                      })
                  }
                  else {
                    this.setState({
                        factorial: res.data.n,
                        didSubmit : true
                      })
                  }
              }
          )
    }

    didGetResponse() {
        if (this.state.didSubmit == true && this.state.factorial != 0){
            let nToPrint = this.state.n
            return (<div>
                        <div>The factorial of {nToPrint} is: </div>
                        <br/>
                        <div id="result">{this.state.factorial}</div>
                    </div>
                    )
            
        }
        else if (this.state.didSubmit == true) {
            return "Please enter a valid number (integer between 0 and 20000)"
        }
        

    }

    render() {
        return (
            <div className="card">
            <h5>Factorial</h5>
            <form onSubmit={this.onSubmit}> 
                <div className="formgroup-inline">
                    <div className="field">
                        <InputText id="firstname1" type="text" placeholder="N" onChange={this.onChangeN} />
                    </div>
                        <Button label="Get factorial!" type="submit"></Button>
                </div>
                
            </form>
            {this.didGetResponse()}
            
        </div>
        );
    } 
}