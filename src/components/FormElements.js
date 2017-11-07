import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import Autocomplete from 'react-google-autocomplete';

export class Input extends React.Component {
	render() {
		return (
			<label className={this.props.labelClass}>
				<div className="label__text">
					{this.props.labelString} {this.props.labelMutedText ? (<span className="text-muted">{this.props.labelMutedText}</span>): null}
				</div>
				<input  
					className={this.props.inputClass} 
					type={this.props.type} 
					name={this.props.name}
					placeholder = {this.props.placeholder}
					defaultValue={this.props.defaultValue} 
					onChange={this.props.changeHandler}
				/>
			</label>
		);
	}
}

export class GMapAutoComplete extends React.Component {
	render() {

		var southWest = new google.maps.LatLng( 12.87232, 77.59480 );
	    var northEast = new google.maps.LatLng( 13.0730, 77.7967 );
	    var bangaloreBounds = new google.maps.LatLngBounds( southWest, northEast );

	    return (
			<label className={this.props.labelClass}>
				<div className="label__text">
					{this.props.labelString} {this.props.labelMutedText ? (<span className="text-muted">{this.props.labelMutedText}</span>): null}
				</div>
				<Autocomplete
					type="text"
					name={this.props.name}
				    className={this.props.inputClass} 
				    onPlaceSelected={this.props.changeHandler}
				    types={[]}
				    bounds = {bangaloreBounds}
				    strictBounds = {true}
				    componentRestrictions={{country: "in"}}
				    placeholder = {this.props.placeholder}
					
				/>
			</label>
		);
	}
}


export class SubmitButton extends React.Component {
	render() {
		return (
			<button className="btn btn-primary" type={this.props.button} disabled={this.props.isSubmitting}>
				{this.props.isSubmitting ? <span className="spinner"></span> : null} 
				<span className={this.props.isSubmitting ? 'hidden': null}>{this.props.value}</span>
			</button>
		);
	}
}

export class Form extends React.Component {
	render() {
		return (
			<form name={this.props.name} className={this.props.inputClass} onSubmit={this.props.submitHandler}>
				{this.props.children}
			</form>
		);
	}
}
