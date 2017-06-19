/**
 * Clase para SIMULAR una autenticación básica. Se conecta al servidor para buscar el usuario y si existe,
 * lo guarda en el localStorage para mantener la sesión abierta.
 */
class AuthService {

	constructor(API_ENDPOINT, $http, $window, $rootScope) {
		this.LOCAL_STORAGE_KEY = 'authenticatedUser';
		this.AUTH_STATUS_CHANGED_EVENT = 'authStatusChanged';
		this.USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';
		this.WRONG_USER_OR_PASSWORD = 'WRONG_USER_OR_PASSWORD';

		this.API_ENDPOINT = API_ENDPOINT;
		this.$http = $http;
		this.$window = $window;
		this.$rootScope = $rootScope;
	}

	/**
	 * Comprueba si el email y el password coinciden con un usuario del sistema
	 *
	 * @param email
	 * @param password
	 * @returns {Promise} Devolvera WRONG_USER_OR_PASSWORD si no existe
	 */
	authenticate(email, password) {
		return new Promise((resolve, reject) => {
			this.$http.get(`${this.API_ENDPOINT}users?email=${email}&password=${password}`).then((response) => {
				const user = response.data;
				this.setAuthenticatedUser(user);
				resolve(user);
			}).catch((error) => {
				if (error.status === 401) reject(this.WRONG_USER_OR_PASSWORD);
				else reject();
			});
		});
	}

	/**
	 * Registra un nuevo usuario en el sistema
	 *
	 * @param name
	 * @param surname
	 * @param email
	 * @param password
	 * @returns {Promise} Devolvera USER_ALREADY_EXISTS si ya existe
	 */
	register(name, surname, email, password) {
		return new Promise((resolve, reject) => {
			const user = {name, surname, email, password};
			this.$http.post(this.API_ENDPOINT + 'users', user).then((response) => {
				const user = response.data;
				this.setAuthenticatedUser(user);
				resolve(user);
			}).catch((error) => {
				if (error.status === 409) reject(this.USER_ALREADY_EXISTS);
				else reject();
			});
		});
	}

	logout() {
		this.setAuthenticatedUser(undefined);
	}

	getAuthenticatedUser() {
		const item = this.$window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
		return item && JSON.parse(item);
	}

	/**
	 * Almacena el usuario en localStorage y lanza un evento para que el resto de componentes se enteren de que se ha autenticado un usuario
	 */
	setAuthenticatedUser(user) {
		this.authenticatedUser = user;
		if (user) {
			this.$window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(user));
		} else {
			this.$window.localStorage.removeItem(this.LOCAL_STORAGE_KEY);
		}
		this.$rootScope.$emit(this.AUTH_STATUS_CHANGED_EVENT, user);
	}
}

export default ['API_ENDPOINT', '$http', '$window', '$rootScope', AuthService];