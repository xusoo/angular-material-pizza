class MainController {

	constructor($mdSidenav, $mdMenu, authService, $state, $rootScope) {
		this.$mdSidenav = $mdSidenav;
		this.$mdMenu = $mdMenu;
		this.authService = authService;
		this.$state = $state;
		this.$rootScope = $rootScope;

		/* Para mostrar u ocultar el menu si estamos o no autenticados */
		this.authenticatedUser = this.authService.getAuthenticatedUser();
		$rootScope.$on(authService.AUTH_STATUS_CHANGED_EVENT, (event, user) => {
			this.authenticatedUser = user;
		});
	}

	openUserMenu($mdMenu, $event) {
		$mdMenu.open($event);
	}

	toggleMenu() {
		this.$mdSidenav('left').toggle();
	}

	closeMenu() {
		this.$mdSidenav('left').close();
	}

	logout() {
		this.authService.logout();
		this.$state.go('login');
		this.closeMenu();
	}
}

export default ['$mdSidenav', '$mdMenu', 'authService', '$state', '$rootScope', MainController];
