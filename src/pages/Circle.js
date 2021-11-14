import React, { Component} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default class Circle extends Component{
    constructor(props){
        super(props)

        
        this.onChangeN = this.onChangeN.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.didGetResponse = this.didGetResponse.bind(this);
        
        this.state = {
            radio : 0,
            area : 0,
            perimeter : 0,
            didSubmit:false,
            
        }
    }

    onChangeN(e) {
        this.setState({
          radio: e.target.value
        })
    }

    onSubmit(e) {
        const toGet = {
            radio : this.state.radio
          }
          axios
          .post('https://backend-mathcalculations.herokuapp.com/circle', toGet)
          .then(
              res => {
                  if (typeof res.data === 'string' ){
                    this.setState({
                        area: 0,
                        perimeter:0,
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
        if (this.state.didSubmit == true && this.state.area != 0  && this.state.perimeter != 0){
            
            return (<div>
                        <div>
                            <div>Perimeter: </div>
                            <div>{this.state.perimeter}cm</div>
                        </div>
                        <br/>
                        <div>
                            <div>Area: </div>
                            <div>{this.state.area}cm<sup>2</sup></div>
                        </div>
                    </div>
                    
            )
            
        }
        else if (this.state.didSubmit == true) {
            return "Please enter a valid radio (between 0 and 2000000000)"
        }
        

    }

    render() {
        return (
            <div className="card">
            <h5>Circle</h5>
            <form onSubmit={this.onSubmit}> 
                <div className="formgroup-inline">
                    <div className="field">
                        <InputText id="firstname1" type="text" placeholder="Radio (in centimetres)" onChange={this.onChangeN} />
                    </div>
                        <Button label="Get area and perimeter!" type="submit"></Button>
                </div>
                
            </form>
            {this.didGetResponse()}
            
        </div>
        );
    } 
}