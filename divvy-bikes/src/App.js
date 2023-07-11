import React from 'react';
import NavBar from './NavBar'
import StationList from './StationList'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      selectedStationIdentifier: null,
      stations:[],
    }
  }

  loadAllStations = async (e) => {
    const httpResponse = await fetch("https://gbfs.divvybikes.com/gbfs/en/station_information.json")
    const stationList = await httpResponse.json()
    
    // TO DO #1: Display the list of stations

    const stationData = stationList.data.stations
    const sortedData = stationData.sort((a, b) => a.name > b.name ? 1 : -1) // TO DO #7: Sort the list alphabetically

    this.setState( {stations: sortedData})
  
    this.state.stations.map(function(stationsData) {

      return (
          <div className="row-sm-3 pt-3"> {stationsData} </div>
          )
      }
      ) 
  }


  // TO DO #2: Display the list of stations when the page initially loads

  componentDidMount() {
    this.loadAllStations();
  }

  componentWillUnmount() { 
    this.loadAllStations(); 
  }


  findNearestStation = async (e) => {
    navigator.geolocation.getCurrentPosition((gps) => {

      if (this.state.stations.length > 0) {
        let nearestStation = this.state.stations[0];
        let nearestDistance = 10000000;
        this.state.stations.forEach(station => {
          const distance = Math.sqrt(((station.lat - gps.coords.latitude)**2) + ((station.lon - gps.coords.longitude)**2))
          if (distance < nearestDistance) {
            nearestDistance = distance
            nearestStation = station
          }
        })
        // TO DO #6: Display the nearest station as the only station in the station list
        // HINT: The nearest station is already stored in the variable 'nearestStation'
        this.setState({ stations: [nearestStation] })
       
      }
    })
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <NavBar onClickLoadAll={this.loadAllStations} onClickNearest={this.findNearestStation} />
        <StationList stations={this.state.stations}/>
      </div>
    )
  }
}


export default App;