import React, { Component} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default class Fibonacci extends Component{
    constructor(props){
        super(props)

        
        this.onChangeN = this.onChangeN.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.didGetResponse = this.didGetResponse.bind(this);
        
        this.state = {
            n : 0,
            fibonacciSequence : "",
            didSubmit:false,
            
        }
    }

    onChangeN(e) {
        
        this.setState({
          n: e.target.value
        })
    }

    onSubmit(e) {
        console.log(this.state.n)
        const toGet = {
            n : this.state.n
          }
          axios
          .post('https://backend-mathcalculations.herokuapp.com/fibonacci', toGet)
          .then(
              res => {
                  if (typeof res.data === 'string' ){
                    this.setState({
                        fibonacciSequence: "",
                        didSubmit : true
                      })
                  }
                  else {
                    this.setState({
                        fibonacciSequence: res.data.n,
                        didSubmit : true
                      })
                  }
              }
          )
    }

    didGetResponse() {
        if (this.state.didSubmit == true && this.state.fibonacciSequence != ""){
            let nToPrint = this.state.n
            return (<div>
                        <div>The first {nToPrint} numbers of the fibonacci sequence are: </div>
                        <br/>
                        <div id="result">{this.state.fibonacciSequence}</div>
                    </div>
                    )
            
        }
        else if (this.state.didSubmit == true) {
            return "Please enter a valid number (integer between 1 and 1500)"
        }
        

    }

    render() {
        return (
            <div className="card">
            <h5>Fibonacci</h5>
            <form onSubmit={this.onSubmit}> 
                <div className="formgroup-inline">
                    <div className="field">
                        <InputText id="firstname1" type="text" placeholder="N" onChange={this.onChangeN} />
                    </div>
                        <Button label="Get sequence!" type="submit"></Button>
                </div>
                
            </form>
            {this.didGetResponse()}
            
        </div>
        );
    } 
}