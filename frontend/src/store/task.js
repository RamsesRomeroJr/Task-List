import { fetch } from './csrf.js'

const SET_TASK = 'task/setTask'

const setTask = (task) => ({
    type: SET_TASK,
    payload: task
});

export const getTask = (taskId) => async (dispatch) => {
    const res = await fetch(`/api/task/${taskId}`);

    dispatch(setTask(res.data.task));
    return res;
}

export const updateTask = ({taskId, title, description}) => async(dispatch) =>{
    const res = await fetch(`/api/task/update/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description
        })
    })
    dispatch(setTask(res.data.task));
    return res
}

export const deleteTask = ({taskId}) => async() => {
    const res = await fetch(`/api/task/delete/${taskId}`, {
        method: 'DELETE'
    })
    return
}

function reducer(state = {task:null}, action){
    let newState;
    switch (action.type) {
        case SET_TASK:
            newState = Object.assign({}, state, {task: action.payload});
            return newState;

        default:
            return state;
    }
}

export default reducer;
