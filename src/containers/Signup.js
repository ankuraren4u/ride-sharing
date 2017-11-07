import React from 'react';
import {Link} from 'react-router-dom';

import {Input, Form, SubmitButton} from './../components/FormElements';
import config from './../settings';
var $ = require("jquery");

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			name: {
				value: null,
				hasError: null
			},
			email: {
				value: null,
				hasError: null
			},
			mobile: {
				value: null,
				hasError: null
			},
			password: {
				value: null,
				hasError: null
			},
			reenterpassword: {
				value: null,
				hasError: null
			},
			carModel: {
				value: null,
				hasError: null
			},
			loading: false
		};
	}

	handleSubmit = (e) =>  {
		
		return false;
	}

	handleChange = (e) =>  {
		var change = {}
	    
	    change[e.target.name] = {
	    	value: e.target.value,
	    	hasError: null
	    }
	    this.setState(change)
	}

	validateInputs = () => {
		var inputs = JSON.parse(JSON.stringify(this.state));

		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var phoneNumberRegex = /^[789]\d{9}$/;
		var hasErrors = false;
		if (!inputs.name.value) {
			inputs.name.error = true;
			hasErrors = true;
		} else {
			inputs.name.error = false;
		}

		if (!inputs.email.value || !emailRegex.test(inputs.email.value)) {
			inputs.email.error = true;
			hasErrors = true;
		} else {
			inputs.email.error = false;
		}

		if (!inputs.mobile.value || !phoneNumberRegex.test(inputs.mobile.value)) {
			inputs.mobile.error = true;
			hasErrors = true;
		} else {
			inputs.mobile.error = false;
		}

		if (!inputs.password.value || inputs.password.value.length < 6) {
			console.log(inputs.password.value);
			inputs.password.error = true;
			hasErrors = true;
		} else {
			inputs.password.error = false;
		}

		if (!inputs.reenterpassword.value || inputs.reenterpassword.value !== inputs.password.value) {
			inputs.reenterpassword.error = true;
			hasErrors = true;
		} else {
			inputs.reenterpassword.error = false;
		}

		if (!inputs.carModel.value) {
			inputs.carModel.error = true;
			hasErrors = true;
		} else {
			inputs.carModel.error = false;
		}

		this.setState(inputs);
		
		return hasErrors;
	}

	handleSubmit = (e) =>  {
		e.stopPropagation;
		e.preventDefault();

		var _that = this;
		var hasErrors = _that.validateInputs();
	
		if(hasErrors) {
			this.setState({
				error: 'Please check fields marked in red'
			})
		} else {
			_that.setState({
				loading: true
			});

			$.post(config.API_URL + 'signup', {
				name: _that.state.name.value, 
				email: _that.state.email.value, 
				password: _that.state.password.value, 
				carModel: _that.state.carModel.value, 
				mobile: _that.state.mobile.value
			}).done(function(data) {
				if (data.error) {
					_that.setState({
						loading: false,
						error: data.error
					});	
				} else {
					_that.props.history.push('/pick-ride')
				}
			}).fail(function(error) {
				_that.setState({
					loading: false
				});	
			});
		}
	}

	render() {
		return (
			<div className="form__wrapper form--signup__wrapper">
				<div className="form">
					<div className="form__title">
						Register
					</div>
					<Form name="signin-form" submitHandler={this.handleSubmit}> 
						{this.state.error ? (<div className="form-error">{this.state.error}</div>): null}
						<div className="form__content">
							<Input 
								type="text" 
								name="name"  
								labelString="Full Name" 
								placeholder="Enter your firstname & lastName" 
								inputClass= {this.state.name.error ? 'input--error': null}
								changeHandler={this.handleChange}
							/>
							<Input 
								type="text" 
								name="email"  
								labelString="Email" 
								placeholder="enter your email ID" 
								inputClass= {this.state.email.error ? 'input--error': null}
								changeHandler={this.handleChange}
							/>
							<Input 
								type="text" 
								name="mobile"  
								labelString="Mobile Number " 
								placeholder="enter your 10-digit mobile number" 
								inputClass= {this.state.mobile.error ? 'input--error': null}
								changeHandler={this.handleChange}
							/>
							<Input 
								type="password" 
								name="password" 
								labelString="Pasword" 
								labelMutedText= "(min 6 characters)"
								inputClass= {this.state.password.error ? 'input--error': null}
								placeholder="set your password" 
								changeHandler={this.handleChange}
							/>
							<Input 
								type="password" 
								name="reenterpassword" 
								labelString="Re-enter Pasword" 
								placeholder="re-enter  your password" 
								inputClass= {this.state.reenterpassword.error ? 'input--error': null}
								changeHandler={this.handleChange}
							/>
							<Input 
								type="text" 
								name="carModel" 
								labelString="Car Model" 
								placeholder="name of the car you have" 
								inputClass= {this.state.carModel.error ? 'input--error': null}
								changeHandler={this.handleChange}
							/>
						</div>
						<div className="form__footer">
							<SubmitButton type="submit" value="Register" isSubmitting={this.state.loading} />
						</div>
					</Form>
	 			</div>
	 			<div className="signup-text">Already have an account? <Link to={"/"}>LOGIN NOW</Link></div>
	 		</div>
		);
	}
}

export default Signup