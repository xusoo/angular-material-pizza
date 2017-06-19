/**
 * Servicio que conecta con la API para obtener las pizzas, los ingredientes y los comentarios
 */
class PizzaService {

	constructor($resource, API_ENDPOINT) {
		this.$resource = $resource;
		this.API_ENDPOINT = API_ENDPOINT;
	}

	getPizzas() {
		return this.$resource(this.API_ENDPOINT + 'pizzas').query().$promise;
	}

	getPizza(id) {
		return this.$resource(this.API_ENDPOINT + 'pizzas/' + id).get().$promise;
	}

	addPizza(pizza) {
		return this.$resource(this.API_ENDPOINT + 'pizzas').save(pizza).$promise;
	}

	getAvailableIngredients() {
		return this.$resource(this.API_ENDPOINT + 'ingredients').query().$promise;
	}

	getComments(pizzaId) {
		return this.$resource(this.API_ENDPOINT + 'pizzas/' + pizzaId + '/comments').query().$promise;
	}

	addComment(pizzaId, comment) {
		return this.$resource(this.API_ENDPOINT + 'pizzas/' + pizzaId + '/comments').save(comment).$promise;
	}
}

export default ['$resource', 'API_ENDPOINT', PizzaService];