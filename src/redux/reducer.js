import { LOGIN_FORM , AUTH_USER, LOGOUT_USER} from "../server/actiontypes"

const initial_state = {
    loginform: false,
    user:{}
}

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case LOGIN_FORM:
            return {
                ...state,
                loginform:!state.loginform
            }
        case AUTH_USER:
            localStorage.setItem("cofounder",action.payload.token)
            return {
                ...state,
                loginform:false,
                user:action.payload.user
            }
        case LOGOUT_USER:
            localStorage.removeItem("cofounder")
            return {
                ...state,
                user:{}
            }
        default:
            return state;
    }
}
export default reducer;