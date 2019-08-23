import React, {Component} from 'react';
import axios from 'axios';

class CitySearch extends Component {

    constructor(props){
        super(props)

        this.state = {
            city: '',            
            temperature: '',
            units: 'metric',
            symbol: 'C',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.callAPI = this.callAPI.bind(this);
    }

    callAPI = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=${this.state.units}&APPID=d5566182730361aa1c00849d2f86bb95`;     
        axios.get(url)            
            .then((response) => {
                this.setState({ 
                    city: response.data.name,
                    temperature: response.data.main.temp,
                    description: response.data.weather[0].main
                });            
                this.props.onSearchComplete(this.state.city, this.state.temperature, this.state.units, this.state.symbol, this.state.description, undefined);
            })
            .catch((error) => { 
                if (error.response) {
                    // server responded with status other than 2xx
                    this.setState({
                        error: error.response.data.message
                    });
                    this.props.onSearchComplete(undefined, undefined, undefined, undefined, undefined, this.state.error);
                    
                } else if (error.request) {
                    // if no response was received    
                    this.setState({
                        error: error.request
                    });

                    this.props.onSearchComplete(undefined, undefined, undefined, undefined, undefined, this.state.error);
                } else {
                    // other error
                    this.setState({
                        error: error.message
                    });
                    this.props.onSearchComplete(undefined, undefined, undefined, undefined, undefined, this.state.error);
                }
            })
        }

    // componentDidMount() {
    //     this.setState({
    //         city: this.props.city
    //     });
    // }
    
    handleChange(e) {
        this.setState({ 
          city: e.target.value
        });
    }

    handleSubmit = (e) =>  {
        e.preventDefault();
        this.callAPI();
    }

    handleUnitChange = (e) => {
        this.setState({
            units: e.target.value,
            symbol: e.target.id
        })
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <label 
                    htmlFor="city">Enter city: 
                </label>
                <br />
                <input
                    type="text"
                    id="city"
                    name="city"                    
                    city={this.state.city}
                    onChange={this.handleChange}
                />
                <div onChange={this.handleUnitChange}>
                    <input 
                        type="radio" 
                        name="units" 
                        value="metric" 
                        id="C"
                        defaultChecked
                    />
                    <label 
                        htmlFor="celcius">Celcius
                    </label>
                    <input 
                        type="radio" 
                        name="units" 
                        value="imperial" 
                        id="F" 
                    />
                    <label 
                        htmlFor="fahrenheit">Fahrenheit
                    </label>
                </div>
                
                <button type="submit">SUBMIT</button>
            </form>
        )
    }
}

export default CitySearch;