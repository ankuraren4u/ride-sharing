import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  Infobox
} from "react-google-maps";


export class GoogleMaps extends React.Component {
	getDirectionService(from, to) {
		var _that = this;
		const directionsService = new google.maps.DirectionsService();
		var request = {
			origin: from, 
			destination: to, 
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
	      if (status == google.maps.DirectionsStatus.OK) {
	        // directionsDisplay.setDirections(response);
	        // directionsDisplay.setMap(map);
	        // 
	        console.log(response);
	        _that.setState({
				direction: response
			})
	      } else {
	        // alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
	      }
	    });	
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.selectedRide) {
			this.getDirectionService(nextProps.selectedRide.coordinates, nextProps.from)
		} else {
			this.setState({
				direction: null
			})
		}
	}
	render() {
		

		const MapWithAMarker = withGoogleMap(props =>
		  <GoogleMap
		    defaultZoom={11}
		    defaultCenter={{ lat: 12.9716, lng: 77.5946 }}
		    options = {{ mapTypeControl: false}}
		  >
		    <Marker position={this.props.from} defaultIcon="/build/img/map-marker.png" />
		    <Marker position={this.props.to} defaultIcon="/build/img/flag-map-marker.png"/>
		    {this.props.selectedRide && this.props.selectedRide.coordinates ? 
		    	<Marker position={this.props.selectedRide.coordinates} defaultIcon="/build/img/car-marker.png"/> : null }
		    {this.props.selectedRide && this.props.selectedRide.coordinates ? 
		    	<DirectionsRenderer directions={this.state.direction}  /> : null }
		  </GoogleMap>
		);

		return (
			<MapWithAMarker
			  containerElement={<div className="google-map" />}
			  mapElement={<div style={{ height: `100%`, width: `100%` }} />} 
			/>
		);
	}
}

