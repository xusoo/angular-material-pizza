/**
 * Servicio para mostrar notificaciones toast de Angular-Material
 */
class ToastService {
	constructor($mdToast) {
		this.$mdToast = $mdToast;
	}

	show(message, duration = 3000) {
		this.$mdToast.show(
			this.$mdToast.simple()
				.textContent(message)
				.position('top right').hideDelay(duration)
		);
	}
}

export default ['$mdToast', ToastService];