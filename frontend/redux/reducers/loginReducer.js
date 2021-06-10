import actions from "../actions";

const loginReducer = (state = {logged: false, pending: false, rejected: false}, action) => {
    switch (action.type) {
		case actions.loginActions.LOGIN_FULFILLED:
			return {
				...state,
				rejected: false,
				pending: false,
				logged: true
			};
		case actions.loginActions.LOGIN_PENDING:
			return {
				...state,
				logged: false,
				rejected: false,
				pending: true
			};
		case actions.loginActions.LOGIN_REJECTED:
			return {
				...state,
				logged: false,
				pending: false,
				rejected: true
			};
		default:
			return state;
	}
};

export default loginReducer;
