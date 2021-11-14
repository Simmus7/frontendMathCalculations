import React, { Component} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default class Triangle extends Component{
    constructor(props){
        super(props)

        this.onChangel1 = this.onChangel1.bind(this);
        this.onChangel2 = this.onChangel2.bind(this);
        this.onChangel3 = this.onChangel3.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.didGetResponse = this.didGetResponse.bind(this);
        
        this.state = {
            l1 : 0,
            l2 : 0,
            l3 : 0,
            area : -1,
            perimeter : -1,
            didSubmit:false,
            
        }
    }

    onChangel1(e) {
        this.setState({
          l1: e.target.value
        })
    }
    onChangel2(e) {
        this.setState({
          l2: e.target.value
        })
    }
    onChangel3(e) {
        this.setState({
          l3: e.target.value
        })
    }

    onSubmit(e) {
        const toGet = {
            l1 : this.state.l1,
            l2 : this.state.l2,
            l3 : this.state.l3,
          }
          axios
          .post('https://backend-mathcalculations.herokuapp.com/triangle', toGet)
          .then(
              res => {
                  if (typeof res.data === 'string' ){
                    this.setState({
                        area: -1,
                        perimeter:-1,
                        didSubmit : true
                      })
                  }
                  else {
                    this.setState({
                        area: res.data.area,
                        perimeter:res.data.perimeter,
                        didSubmit : true
                      })
                  }
              }
          )
    }

    didGetResponse() {
        if (this.state.didSubmit == true && this.state.area != -1  && this.state.perimeter != -1){
            
            return (<div>
                        <div>
                            <div>Perimeter:</div>
                            <div>{this.state.perimeter}cm</div>
                        </div>
                        <br/>
                        <div>
                            <div>Area:</div>
                            <div>{this.state.area}cm<sup>2</sup></div>
                        </div>
                    </div>
                    
            )
            
        }
        else if (this.state.didSubmit == true) {
            return "Please enter valid sides of the triangle (between 0 and 230000000)"
        }
        

    }

    render() {
        return (
            <div className="card">
            <h5>Triangle</h5>
            <form onSubmit={this.onSubmit}> 
                <div className="formgroup-inline">
                    <div className="field">
                        <InputText id="firstname1" type="text" placeholder="Side 1" onChange={this.onChangel1} />
                    </div>
                    <div className="field">
                        <InputText id="firstname1" type="text" placeholder="Side 2" onChange={this.onChangel2} />
                    </div>
                    <div className="field">
                        <InputText id="firstname1" type="text" placeholder="Side 3" onChange={this.onChangel3} />
                    </div>
                    <Button label="Get area and perimeter!" type="submit"></Button>
                </div>
                
            </form>
            {this.didGetResponse()}
            
        </div>
        );
    } 
}