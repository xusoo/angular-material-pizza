import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-resource';
import 'angular-gravatar';
import '@uirouter/angularjs';

import MainComponent from 'main.component';
import PizzaModule from 'pizza/pizza.module';
import AuthModule from 'auth/auth.module';
import Routing from 'app.routing';
import ToastService from 'shared/services/toast.service';

export default angular.module('app', ['ngMaterial', 'ngResource', 'ui.gravatar', 'ui.router', PizzaModule.name, AuthModule.name])
	.config(Routing)
	.config(['gravatarServiceProvider', gravatarServiceProvider => {
		gravatarServiceProvider.defaults = {default: 'identicon'};
	}])
	.constant('API_ENDPOINT', 'API_ENDPOINT_VAR')
	.component('main', MainComponent)
	.service('toastService', ToastService);

angular.bootstrap(document.body, ['app']);