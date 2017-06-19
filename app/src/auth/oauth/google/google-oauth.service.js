/**
 * Proveedor OAuth para conectar con Google. Por ahora no almacena usuarios en nuestros sistema, solo loguea,
 * por lo que no puede enviar comentarios por ejemplo (necesitamos su ID en BD)
 */
class GoogleOAuthService {

	constructor($http, $window, authService) {
		this.$http = $http;
		this.$window = $window;
		this.authService = authService;
		this.CLIENT_ID = '1008807640379-pljnt1i7k03r6dvova2tas4neo742c9l.apps.googleusercontent.com';
	}

	/**
	 * Inicia el OAuth flow con Google
	 */
	authenticate() {
		const clientId = this.$window.encodeURIComponent(this.CLIENT_ID);
		const scope = this.$window.encodeURIComponent('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');
		const currentUrl = this.$window.location.protocol + '//' + this.$window.location.host;
		const redirectUri = this.$window.encodeURIComponent(currentUrl + '/oauth/google');
		this.$window.open(`https://accounts.google.com/o/oauth2/v2/auth?
			response_type=token&
			client_id=${clientId}&
			scope=${scope}&
			redirect_uri=${redirectUri}`, '_blank', 'width=500,height=600');
	}

	/**
	 * Obtiene el usuario de Google a partir del access_token
	 * @param access_token
	 */
	getUser(access_token) {
		return new Promise((resolve, reject) => {
			this.$http.get(`https://www.googleapis.com/userinfo/v2/me?access_token=${access_token}`).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

}

export default ['$http', '$window', 'authService', GoogleOAuthService];