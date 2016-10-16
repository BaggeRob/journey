import React from 'react'
import { render } from 'react-dom'
import GoogleMapReact from 'google-map-react'

const Place = (props) => {
  return <div>{props.text}</div>
}

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state.places = [];
  }

  state = {
    center: [ 51.488385904364094, -0.20612264782721468 ],
    zoom: 15
  };

  _addPlace(lat, lng, text) {
    this.setState(
      {
        places: [
          ...this.state.places,
          {
            lat,
            lng,
            text
          }
        ]
      });
  }

  _onClick = ({ x, y, lat, lng, event }) => {
    this._addPlace(lat, lng, 'place');
  }

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom
    });
  }

  render() {
    return (
      <GoogleMapReact
        onChange={this._onChange}
        onClick={this._onClick}
        center={this.state.center}
        zoom={this.state.zoom}>
        {this.state.places && this.state.places.map((place, index) => <Place key={`place-${index}`} className="place" {...place}/>)}
      </GoogleMapReact>
    );
  }
}

render(
  <div style={{width: '100%', height: '700px'}}>
    <SimpleMap />
    <button onClick={() => {console.log('Added place')}}>Add Place!</button>
  </div>,
  document.getElementById('root')
);