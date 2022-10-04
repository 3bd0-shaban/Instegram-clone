import ACTIONS from "../Actions/Index";

const intialState = {
    loading:false,
    userinfo: [],
    isLoggedIn: false,
    inAdmin: false
}
const authReducer = (state = intialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return{
                ...state,
                isLoggedIn:true
            }
        default:
            return state
    }
}
export default authReducer