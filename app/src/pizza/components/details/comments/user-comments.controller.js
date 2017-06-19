class UserCommentsController {
	constructor(pizzaService, $scope, $stateParams, authService, toastService) {
		this.form = {}; // Template-binded
		this.pizzaService = pizzaService;
		this.authService = authService;
		this.toastService = toastService;
		this.$scope = $scope;

		/* Aquí debería obtener el ID via component-binding, pero no he conseguido hacerlo funcionar tal como está configurado */
		this.pizza = {id: $stateParams.id};

		pizzaService.getComments(this.pizza.id).then((comments) => {
			$scope.$evalAsync(() => {
				this.comments = comments;
			});
		});

		this.userRating = null;
		this.userComment = '';
	}

	saveComment() {
		if (this.form.$invalid) {
			return;
		}

		const comment = {
			date: Date.now(),
			rating: this.userRating,
			text: this.userComment,
			user: this.authService.getAuthenticatedUser(),
			pizza: {id: this.pizza.id}
		};

		this.pizzaService.addComment(this.pizza.id, comment).then((comment) => {
			this.comments.push(comment);
			this.resetForm();
		}).catch(() => {
			this.toastService.show('Oops... no se ha podido enviar tu comentario :(');
		});
	}

	resetForm() {
		this.$scope.$evalAsync(() => {
			this.userRating = null;
			this.userComment = '';
			this.form.$setPristine();
			this.form.$setUntouched();
		});
	}
}

export default ['pizzaService', '$scope', '$stateParams', 'authService', 'toastService', UserCommentsController];