import GoogleOAuthResponseController from 'auth/oauth/google/google-oauth-response.controller';

/**
 * Configuración de las rutas de la aplicación incluída la comprobación de la autenticación
 */
export default ['$locationProvider', '$urlRouterProvider', '$stateProvider', ($locationProvider, $urlRouterProvider, $stateProvider) => {

	/* No ha habido manera de configurar rollup-plugin-serve para que redirija al index.html ante un 404,
	 * así que no puedo usar html5mode.
	 * Parece un bug: https://github.com/thgh/rollup-plugin-serve/commit/1d979b4cfc2cfe093d6cb99868cc984e0887effe */
	if (ENVIRONMENT === 'production') {
		$locationProvider.html5Mode(true).hashPrefix('!');
	}

	$urlRouterProvider.otherwise('/');

	$urlRouterProvider.when('/', 'pizzas');

	const authenticationResolver = {
		authentication: ['authService', '$state', '$q', (authService, $state, $q) => {
			const defer = $q.defer();
			if (authService.getAuthenticatedUser()) {
				defer.resolve();
			} else {
				defer.reject();
				$state.go('login');
			}
			return defer.promise;
		}]
	};

	const alreadyAuthenticatedResolver = {
		authentication: ['authService', '$state', '$q', (authService, $state, $q) => {
			const defer = $q.defer();
			if (authService.getAuthenticatedUser()) {
				defer.reject();
				$state.go('pizza-list');
			} else {
				defer.resolve();
			}
			return defer.promise;
		}]
	};

	$stateProvider.state('login', {
		url: '/login',
		component: 'login',
		resolve: alreadyAuthenticatedResolver
	});

	$stateProvider.state('register', {
		url: '/register',
		component: 'register',
		resolve: alreadyAuthenticatedResolver
	});

	$stateProvider.state('pizza-list', {
		url: '/pizzas',
		component: 'pizzaList',
		resolve: authenticationResolver
	});

	$stateProvider.state('pizza-details', {
		url: '/pizzas/:id',
		component: 'pizzaDetails',
		resolve: authenticationResolver
	});

	$stateProvider.state('add-pizza', {
		url: '/pizzas/add',
		component: 'addPizza',
		resolve: authenticationResolver
	});

	$stateProvider.state('oauth-google', {
		url: '/oauth/google',
		controller: GoogleOAuthResponseController
	});
}];