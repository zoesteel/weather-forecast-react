import React, {Component} from 'react';
import './App.scss';
import SunIcon from './images/sun.png';
import CitySearch from './CitySearch';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: '',
            temperature: '',
            units: 'metric',
            symbol: '',
            description: '',
            message: '',
            error: undefined,
        }        
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(city, temperature, units, symbol, description, error) {
        this.setState({
            city: city,
            temperature: temperature,
            units: units,
            symbol: symbol,
            description: description,
            error: error,
            message: `The temperature in ${city} is ${temperature}°${symbol}`,
        });
    }
      
    callApi = async () => {
        const response = await fetch('/weather');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    };
      
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                post: this.state.post,
                units: this.state.units
            }),
        });
       
        const body = await response.json();
        this.setState({ 
            responseToPost: body,
            city: body.city,
            temperature: body.temperature,
            description: body.description,
            message: `The temperature in ${body.city} is ${body.temperature}°${this.state.symbol}`,
         });
    };

    // handles change in radio buttons for imperial or metric
    handleUnitChange = (e) => {
        this.setState({
            units: e.target.value,
            symbol: e.target.id,
        })
    }

    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={SunIcon} alt="sun icon" className="sun" />
                    <h1 className="title">Check the weather</h1>
                    

                    {/* if error exists then display it */}
                    { this.state.error !== undefined && 
                         <p>{this.state.error}</p>
                    }

                    {/*if no error message exists then display the weather message */}
                    { this.state.error === undefined &&
                        <div>
                            <h2>{this.state.description}</h2>                    
                            <p>{this.state.message}</p>     
                        </div>
                    }
                    
                    {/* the input form  */}
                    <CitySearch 
                        onSearchComplete={this.handleSearch}
                    />
                    
                </header>
            </div>
        );
    }
}

export default App;