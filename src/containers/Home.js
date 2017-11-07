import React from 'react';
import {Link} from 'react-router-dom';

import {Input, Form, SubmitButton} from './../components/FormElements';
import config from './../settings';
var $ = require("jquery");

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			username : null,
			password: null,
			loading: false
		};
	}

	handleSubmit = (e) =>  {
		e.stopPropagation;
		e.preventDefault();

		var _that = this;
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var phoneNumberRegex = /^[789]\d{9}$/;
		if (!_that.state.username) {
			_that.setState({
				error: 'Username not present'
			});
		} else if (!_that.state.password) {
			_that.setState({
				error: 'Password not present'
			});
		} else if (!phoneNumberRegex.test(_that.state.username) && !emailRegex.test(_that.state.username)) {
			_that.setState({
				error: 'Invalid Username'
			});
		} else {
			_that.setState({
				loading: true
			});

			console.log(_that.state);

			$.post(config.API_URL + 'auth', {
				username: _that.state.username, 
				password: _that.state.password
			}).done(function(data) {
				console.log(data);
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

		return false;
	}

	handleUsernameChange = (e) =>  {
		this.setState({
			error: false,
			username : e.target.value
		})
	}

	handlePasswordChange = (e) =>  {
		this.setState({
			error: false,
			password : e.target.value
		})
	}

	render() {
		return (
			<div className="form__wrapper form--signin__wrapper">
				<div className="form form--signin">
					<div className="form__title">
						Login
					</div>
					<Form name="signin-form" submitHandler={this.handleSubmit}> 
						{this.state.error ? (<div className="form-error">{this.state.error}</div>): null}
						<div className="form__content">
							<Input 
								type="text" 
								name="text"  
								labelString="Username" 
								placeholder="10-digit mobile number or email ID" 
								changeHandler={this.handleUsernameChange}
							/>
							<Input 
								type="password" 
								name="password" 
								labelString="Pasword" 
								placeholder="10-digit mobile number or email ID" 
								changeHandler={this.handlePasswordChange}
							/>
						</div>
						<div className="form__footer">
							<div className="align-left text-small m-b-10px">
								<a href="#">FORGOT PASSWORD?</a>
							</div>
							<SubmitButton type="submit" value="Login" isSubmitting={this.state.loading} />
						</div>
					</Form>
	 			</div>
	 			<div className="signup-text">Don&rsquo;t have an account? <Link to={"signup"}>REGISTER NOW</Link></div>
	 		</div>
		);
	}
}

export default Home