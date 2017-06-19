class RegisterController {
	constructor(authService, $state, $scope, toastService) {
		this.$state = $state;
		this.$scope = $scope;
		this.authService = authService;
		this.toastService = toastService;
	}

	register() {
		if (this.form.$invalid) {
			return;
		}

		this.authService.register(this.name, this.surname, this.email, this.password).then(() => {
			this.$state.go('pizza-list');
		}).catch((error) => {
			if (error === this.authService.USER_ALREADY_EXISTS) {
				this.toastService.show('Usuario ya existente', 5000);
			}
		});
	}

}

export default ['authService', '$state', '$scope', 'toastService', RegisterController];