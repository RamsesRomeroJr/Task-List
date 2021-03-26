import { fetch } from './csrf.js'

const SET_LISTS = 'lists/setLists'

const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
});

export const getLists = () => async (dispatch) => {
    const res = await fetch('/api/lists');
    dispatch(setLists(res.data.lists));
    return res;
}

export const createList = ({userId, title}) => async (dispatch) => {
    const res = await fetch('/api/lists/create', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            title
        })
    })
    dispatch(setLists(res.data.lists));
    return res;
}

export const updateList = ({userId, title, listId}) => async (dispatch) => {
    const res = await fetch(`/api/lists/update/${listId}`, {
        method: 'PUT',
        body: JSON.stringify({
            userId,
            title
        })
    })
    dispatch(setLists(res.data.lists));
    return res;
}

export const createTask = ({listId, userId, title, description}) => async (dispatch) => {
    const res = await fetch('/api/task/create',{
        method: 'POST',
        body: JSON.stringify({
            listId,
            userId,
            title,
            description
        })
    })
    dispatch(setLists(res.data.lists));
    return res
}

export const deleteList = ({userId, listId}) => async (dispatch) => {
    const res = await fetch(`/api/lists/delete/${listId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            userId
        })
    })
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
