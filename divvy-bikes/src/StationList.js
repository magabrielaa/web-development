import React from 'react';
import StationDetails from './StationDetails'

class StationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStationName: null,
      selectedStationDetails: null
    }
  }

  handleStationClick = (e) => {
    e.preventDefault();
    const stationIdentifier = e.currentTarget.getAttribute('data-station-id')
    const selectedStation = this.props.stations.find(station => station.station_id === stationIdentifier)
    if (selectedStation) {
      // TO DO #3: Update this component's state so that
      //           this.state.selectedStationName will contain 
      //           the selected station's name.

      this.setState( {selectedStationName: selectedStation})
      // Keep the following line. 
      this.getStationDetails(stationIdentifier);
    }
  }

  getStationDetails = async (stationIdentifier) => {
    const httpResponse = await fetch("https://gbfs.divvybikes.com/gbfs/en/station_status.json")
    const results = await httpResponse.json();
    const details = results.data.stations.find(station => station.station_id === stationIdentifier)
    // TO DO #4: Update this component's state so that
    //           this.state.selectedStationDetails will have the same value 
    //           as the 'details' variable above
    this.setState( {selectedStationDetails: details})
  }

  render = () => {
    const stationMarkup = (this.props.stations.length > 0 &&
      this.props.stations.map(station => {
        return (
          <li onClick={this.handleStationClick} className="list-group-item" data-station-id={station.station_id} key={station.station_id}>
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0">{station.name}</p>
              <p className="m-0"><span className="badge bg-secondary rounded-pill">{station.capacity}</span></p>
            </div>
          </li>
        )
      })
    )
    return (
      <div className="row mt-5 justify-content-center">
        <div className="col-sm-5">
          <ul className="list-group">
            {stationMarkup}
          </ul>
        </div>

        <div className="col-sm-4">
          <StationDetails details={this.state.selectedStationDetails} name={this.state.selectedStationName} />
        </div>
      </div>
    )
  }
}

export default StationList;