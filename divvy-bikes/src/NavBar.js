import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
        <div className="container-fluid">
          <span className="navbar-brand">Divvy Finder</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a onClick={this.props.onClickLoadAll} className="nav-link" href="#">All Stations</a>
              </li>
              <li className="nav-item">
                <a onClick={this.props.onClickNearest} className="nav-link" href="#">Find Nearest Station</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default NavBar;
