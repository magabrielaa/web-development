// import logo from './logo.svg';
import React from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      picture: []
    }
  }

  showPOD = async (e) => {
    const url = this.nasaURL("planetary/apod")
    const httpResponse = await fetch(url)
    const data = await httpResponse.json()
    console.log("what is the data", data)
    const img = data.url
    console.log("what is the image", img)
    this.setState({ picture: img })
    console.log("show pic url", this.state.picture)
    return(<img src={this.state.picture} alt="POD" width="500" height="600"> </img>)
  }

  render() {
    return(
      <div>
        <header> HELLOOOO THERE</header>
        <button type="button" onClick={this.showPOD}>See NASA's picture of the day!</button>
        <div> {this.showPOD} </div>
        {/* <img className="row mb-5 justify-content-between">{this.state.picture}</img> */}

      </div>
    )
  }

  nasaURL(resource){
    const api_key = "uncGeyuWQTcLB9caUSe8VJcZXL6iMe1MnNpSdOlX"
    const base_url = `https://api.nasa.gov/${resource}`
    console.log(`${base_url}?api_key=${api_key}`)
    return `${base_url}?api_key=${api_key}`
  }

}

export default App;