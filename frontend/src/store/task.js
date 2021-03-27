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

export const checkTask = ({taskId}) => async(dispatch) => {
    const res = await fetch(`/api/task/check/${taskId}`, {
        method: 'PUT'
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

//comment fetches
export const createComment = ({userId,taskId,content}) => async(dispatch)=>{
    const res = await fetch('/api/comment/create',{
        method: 'POST',
        body:JSON.stringify({
            userId,
            taskId,
            content
        })
    })
    dispatch(setTask(res.data.task));
    return res
}

export const updateComment = ({commentId, content, taskId}) => async(dispatch)=>{
    const res = await fetch(`/api/comment/update/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            content,
            taskId
        })
    })
    dispatch(setTask(res.data.task));
    return res
}

export const deleteComment = ({commentId, taskId}) => async(dispatch)=>{
    const res = await fetch(`/api/comment/delete/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            taskId
        })
    })
    dispatch(setTask(res.data.task));
    return res
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
