class AddPizzaController {
	constructor(pizzaService, $state) {
		this.pizzaService = pizzaService;
		this.$state = $state;
		this.form = {}; // Template-binded

		this.availableIngredients = [];

		this.pizzaName = '';
		this.selectedIngredients = [];
		this.imagePath = '';

		pizzaService.getAvailableIngredients().then((availableIngredients) => {
			this.availableIngredients = availableIngredients;
		});
	}

	savePizza() {
		if (this.form.$invalid) {
			return;
		}

		this.pizzaService.addPizza({
			name: this.pizzaName,
			imagePath: this.imagePath,
			ingredients: this.selectedIngredients.map((id) => {
				return {id: id};
			})
		}).then((pizza) => {
			this.$state.go('pizza-details', {
				id: pizza.id
			});
		});
	}
}

export default ['pizzaService', '$state', AddPizzaController];