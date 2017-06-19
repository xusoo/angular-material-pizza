class PizzaDetailsController {
	constructor(pizzaService, $scope, $stateParams, toastService) {
		this.pizzaService = pizzaService;
		this.$scope = $scope;
		this.toastService = toastService;
		this.form = {}; // Template-binded

		pizzaService.getPizza($stateParams.id).then((pizza) => {
			$scope.$evalAsync(() => {
				this.pizza = pizza;
			});
		}).catch((err) => {
			if (err.status === 404) {
				toastService.show('404: Pizza no encontrada!');
			}
		});
	}
}

export default ['pizzaService', '$scope', '$stateParams', 'toastService', PizzaDetailsController];