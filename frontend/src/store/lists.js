import { fetch } from './csrf.js'

const SET_LISTS = 'lists/setLists'
const REMOVE_LIST = 'lists/removeList'

const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
});

const removeList = () => ({
    type:REMOVE_LIST
})

export const getLists = () => async (dispatch) => {
    const res = await fetch('./api/lists');
    dispatch(setLists(res.data.lists));
    return res;
}

function reducer(state = {lists:null}, action){
    let newState;
    switch(action.type){
        case SET_LISTS:
            newState = Object.assign({}, state, {lists: action.payload});
            return newState;
        default:
            return state;
    }
}

export default reducer;
