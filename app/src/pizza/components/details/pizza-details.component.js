import PizzaDetailsController from 'pizza-details.controller';
import 'pizza-details.styles.css';

export default {
	templateUrl: 'src/pizza/components/details/pizza-details.template.html',
	controller: PizzaDetailsController,
	bindings: {
		pizza: '<'
	}
};