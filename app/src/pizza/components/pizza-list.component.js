import PizzaListController from 'pizza-list.controller';
import 'pizza-list.styles.css';

export default {
	templateUrl: 'src/pizza/components/pizza-list.template.html',
	controller: PizzaListController,
	bindings: {
		pizzas: '<'
	}
};