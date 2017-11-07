import React from 'react';
import {Link} from 'react-router-dom';
import {Input, Form, SubmitButton, GMapAutoComplete} from './../components/FormElements';
import {GoogleMaps} from './../components/GoogleMap';

import config from './../settings';
var $ = require("jquery");

class PickRide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			from: null,
			to: null
		};
	}

	handleLocationChange = (domName, loc) =>  {
		var change = {}
	    var _that = this;
	    
	    if(loc.geometry) {
	    	change[domName] = {
		    	lat: loc.geometry.location.lat(),
		    	lng: loc.geometry.location.lng()
		    };	
	    } else {
	    	change[domName] = null;
	    }
	    change['selectedRideIndex'] = null;

	    _that.setState(change, function(state) {
	    	if (this.state.from && this.state.to) {
	    	;	$.get(config.API_URL + 'getRides', {
					from: this.state.from, 
					to: this.state.to,
					//Just for showing in the list
					startAddress: loc.address_components[0].long_name
				}).done(function(data) {
					if (data.success) {
						_that.setState({
							rides: data.rides
						});	
					} else {
						_that.setState({
			    			rides: null
			    		});
					}
				}).fail(function(error) {
					_that.setState({
						loading: false
					});	
				});
	    	} else {
	    		_that.setState({
	    			rides: null
	    		});
	    	}
	    });
	}

	handleRideClick = (index) =>  {
		if(index === this.state.selectedRideIndex) {
			this.setState({
				selectedRideIndex: null
			});
		} else {
			this.setState({
				selectedRideIndex: index
			});	
		}
		
	}


	render() {
		var gmapInstance;
		var rideList = [];
		var _that =this;
		
		if(this.state.from && this.state.to) {
			gmapInstance = <GoogleMaps 
				from= {this.state.from} 
				to={this.state.to} 
				selectedRide={(this.state.rides && this.state.rides.length && (this.state.selectedRideIndex != null)) ? this.state.rides[this.state.selectedRideIndex] : null} />
		}

		if (this.state.rides && this.state.rides.length) {
			this.state.rides.forEach(function(item, index) {
				rideList.push(
					<div key={index} className={_that.state.selectedRideIndex === index ? "ride grid-mid-2 ride--selected": "ride grid-mid-2"} onClick={_that.handleRideClick.bind(this, index)}>
						<div className="ride__img-wrapper clearfix">
							{_that.state.selectedRideIndex === index ? <img className="ride__img" src="/build/img/check.png" />:<img className="ride__img" src={item.photo} />}
						</div>
						<div className="ride__info">
							<div className="ride__primary-info clearfix">
								<div className="ride__name">{item.name} <span className="text-muted font-size-normal">{item.duration} away</span></div>
								<div className="ride__rating"><span className="ride__rating-value">{item.rating} </span>| &#9733;</div>
							</div>
							<div className="ride__route"><b>Route: </b>{item.route}</div>
							<div className="ride__secondary-info clearfix">
								<div className="ride__car"><b>Car: </b>{item.car}</div>
								<div className="ride__seat"><b>Seats Available: </b>{item.seatAvailable}</div>
							</div>
						</div>
					</div>
				);	
			});
		} 

		return (
			<div className="container">
				<div className="form form--pick-ride">
					<div className="form__title">
						Pick a Ride
					</div>
					<div className="form__content clearfix">
						<div className="grid clearfix">
							<div className="grid-mid-2">
								<GMapAutoComplete 
									type="text" 
									name="from"  
									labelString="Start From" 
									placeholder="Enter start location" 
									changeHandler={this.handleLocationChange.bind(this,'from')}
								/>
							</div>
							<div className="grid-mid-2">
								<GMapAutoComplete 
									type="text" 
									name="to"  
									labelString="Destination" 
									placeholder="Enter destination"
									changeHandler={this.handleLocationChange.bind(this,'to')}
								/>
							</div>
						</div>
						{gmapInstance}
					</div>
	 			</div>
	 			{rideList && rideList.length ? <div className="clearfix grid">{rideList}</div>: null}
	 		</div>
		);
	}
}
///<div className="google-map"></div>
export default PickRide