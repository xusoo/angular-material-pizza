class LoginController {
	constructor(authService, $state, $scope, toastService, $injector) {
		this.$state = $state;
		this.$scope = $scope;
		this.$injector = $injector;
		this.authService = authService;
		this.toastService = toastService;
	}

	/**
	 * Login con email y password
	 */
	login() {
		if (this.form.$invalid) {
			return;
		}

		this.authService.authenticate(this.email, this.password).then(() => {
			this.$state.go('pizza-list');
		}).catch((error) => {
			if (error === this.authService.WRONG_USER_OR_PASSWORD) {
				this.toastService.show('Usuario o contraseña incorrectos', 5000);
			}
		});
	}

	/**
	 * Login con OAuth a un tercero
	 * @param provider Por ahora solo soporta 'google'
	 */
	authenticate(provider) {
		this.$injector.get(provider + 'OAuthService').authenticate();
	}

}

export default ['authService', '$state', '$scope', 'toastService', '$injector', LoginController];