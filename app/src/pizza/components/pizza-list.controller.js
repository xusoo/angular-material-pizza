class PizzaListController {
	constructor(pizzaService, $scope, toastService) {
		pizzaService.getPizzas().then((pizzas) => {
			$scope.$evalAsync(() => {
				this.pizzas = pizzas;
			});
		}).catch(() => {
			toastService.show('Parece que hay un problema con la API ¿Puede que no esté levantada?', 5000);
		});
	}
}

export default ['pizzaService', '$scope', 'toastService', PizzaListController];