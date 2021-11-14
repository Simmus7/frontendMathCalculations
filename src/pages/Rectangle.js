import React, { Component} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default class Rectangle extends Component{
    constructor(props){
        super(props)

        
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeLarge = this.onChangeLarge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.didGetResponse = this.didGetResponse.bind(this);
        
        this.state = {
            height : 0,
            large : 0,
            area : -1,
            perimeter : -1,
            didSubmit:false,
            
        }
    }

    onChangeHeight(e) {
        this.setState({
          height: e.target.value
        })
    }
    onChangeLarge(e) {
        this.setState({
          large: e.target.value
        })
    }

    onSubmit(e) {
        const toGet = {
            large : this.state.large,
            height : this.state.height
          }
          axios
          .post('https://backend-mathcalculations.herokuapp.com/rectangle', toGet)
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
                            <div id="result1">{this.state.perimeter}cm</div>
                        </div>
                        <br/>
                        <div>
                            <div>Area:</div>
                            <div id="result2">{this.state.area}cm<sup>2</sup></div>
                        </div>
                    </div>
                    
            )
            
        }
        else if (this.state.didSubmit == true) {
            return "Please enter valid sides of the rectangle (between 0 and 230000000)"
        }
        

    }

    render() {
        return (
            <div className="card">
            <h5>Rectangle</h5>
            <form onSubmit={this.onSubmit}> 
                <div className="formgroup-inline">
                    <div className="field">
                        <InputText id="side1" type="text" placeholder="Heigth" onChange={this.onChangeHeight} />
                    </div>
                    <div className="field">
                        <InputText id="side2" type="text" placeholder="Length" onChange={this.onChangeLarge} />
                    </div>
                        <Button label="Get area and perimeter!" type="submit"></Button>
                </div>
                
            </form>
            {this.didGetResponse()}
            
        </div>
        );
    } 
}