import UserCommentsController from 'user-comments.controller';
import 'user-comments.styles.css';

export default {
	templateUrl: 'src/pizza/components/details/comments/user-comments.template.html',
	controller: UserCommentsController,
	binding: {
		pizza: '<'
	}
};