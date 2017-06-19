import angular from 'angular';

import PizzaListComponent from 'components/pizza-list.component';
import AddPizzaComponent from 'components/add-pizza/add-pizza.component';
import PizzaDetailsComponent from 'components/details/pizza-details.component';
import UserCommentsComponent from 'components/details/comments/user-comments.component';
import PizzaService from 'pizza.service';

export default angular.module('pizza', [])
	.component('pizzaList', PizzaListComponent)
	.component('addPizza', AddPizzaComponent)
	.component('pizzaDetails', PizzaDetailsComponent)
	.component('userComments', UserCommentsComponent)
	.service('pizzaService', PizzaService);

