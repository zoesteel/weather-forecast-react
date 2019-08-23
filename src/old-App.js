import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: '',
      temperature: '',
      units: 'metric',
      symbol: 'C',
      responseToPost: '',
      value: '',
      response: '',
      post: '',
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  // callAPI() {
  // //   fetch('localhost:3001/')
  //       const city = this.state.city;
  //       const api_key = process.env.API_KEY;
  //       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d5566182730361aa1c00849d2f86bb95`
  //       fetch(url)

  //       .then(response => console.log(response))
  //       .then(response => response.json()) 
        
  //       // .then(response => JSON.stringify(response))
  //       .then(response => JSON.stringify(response.main.temp))
  //       .then(response => this.setState({ temperature: response }))
  //       .catch(err => console.log(err))
  // }

  // callAPI = async () => {
  //   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=d5566182730361aa1c00849d2f86bb95`);
  //   const body = await response.json();
  //   if(response.status !== 200) throw Error(body.message);

  //   return body;
  // };
  
  handleChange(e) {
    this.setState({ 
      city: e.target.value 
    });
  }

  // handleSubmit = async event =>  {
  //   event.preventDefault();
  //   console.log(`${this.state.city}`);
  //   // this.callAPI();

  //   const response = await fetch('/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });

    // fetch(`/city?city=${encodeURIComponent(this.state.city)}`)
    //   .then(response => response.json())
    //   .then(state => this.setState(state));

    // const response = await fetch('api/weather', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({post: this.state.weather
    //   });
    //   const body = await response.text();

    // })
    // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter city: </label>
            <input
              id="city"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <div>
              <input 
                type="radio" 
                name="units" 
                value="celcius" 
                id="celcius"  
              />
              <label 
                htmlFor="celcius">Celcius
              </label>
              <input 
                type="radio" 
                name="units" 
                value="fahrenheit" 
                id="fahrenheit" 
              />
              <label 
                htmlFor="fahrenheit">Fahrenheit
              </label>
            </div>
            
            <button type="submit">Submit</button>
          </form>
          <p>Temperature for {this.state.city} is {this.state.temperature}&#176;{this.state.symbol}
          </p>

          <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>


        </header>
      </div>
    );
  }
}

export default App;