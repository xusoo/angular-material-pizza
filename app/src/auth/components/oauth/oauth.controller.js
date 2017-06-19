class OAuthController {
	constructor($window, $http, authService) {
		/**
		 * Obtenemos el access_token y con él, obtenemos el usuario de Google, lo logueamos en la aplicación y refrescamos
		 */
		const access_token = $window.location.hash.split('=')[1];
		$http.get(`https://www.googleapis.com/userinfo/v2/me?access_token=${access_token}`).then((response) => {
			authService.setAuthenticatedUser({
				name: response.data['given_name'],
				surname: response.data['family_name'],
				email: response.data['email']
			});
			$window.opener.location.reload();
			$window.close();
		}).catch((error) => {
			console.log(error);
		});
	}
}

export default ['$window', '$http', 'authService', OAuthController];