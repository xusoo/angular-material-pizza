class GoogleOAuthResponseController {
	constructor($window, googleOAuthService, authService) {
		/**
		 * Obtenemos el access_token y con él, obtenemos el usuario de Google, lo logueamos en la aplicación y refrescamos
		 */
		const access_token = $window.location.hash.split('=')[1];
		googleOAuthService.getUser(access_token).then((user) => {
			authService.setAuthenticatedUser({
				name: user['given_name'],
				surname: user['family_name'],
				email: user['email']
			});
			$window.opener.location.reload();
			$window.close();
		}).catch((error) => {
			console.log(error);
		});
	}
}

export default ['$window', 'googleOAuthService', 'authService', GoogleOAuthResponseController];