import CONSTS from '../../constants/consts'

interface IntialState {
    posts: any
}

const intialState: IntialState = {
    posts: []
}


export const appReducer = (state: IntialState = intialState, action: any): IntialState => {
    switch (action.type) {
        case CONSTS.GET_POSTS: {
            const postVals = [...state.posts, ...action.posts]
            return { ...state, posts: postVals };
        }
        default:
            return state;
    }
}
