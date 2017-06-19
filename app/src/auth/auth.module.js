import angular from 'angular';

import AuthService from 'auth.service';
import LoginComponent from 'components/login/login.component';
import RegisterComponent from 'components/register/register.component';
import GoogleOAuthService from 'oauth/google/google-oauth.service';

export default angular.module('auth', [])
	.service('authService', AuthService)
	.component('login', LoginComponent)
	.component('register', RegisterComponent)
	.service('googleOAuthService', GoogleOAuthService);
