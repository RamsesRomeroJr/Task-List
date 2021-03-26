import React, {useEffect} from 'react';
import styled from 'styled-components'
import { Redirect, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getTask, deleteTask} from '../../store/task.js'
import { get } from 'js-cookie';

function TaskPage (){
    const dispatch = useDispatch()
    const {id} = useParams()

    const sessionUser = useSelector((state)=> state.session.user)

    useEffect(async() => {
        dispatch(getTask(id)
        )
    }, []);

    if (!sessionUser){
        return <Redirect to="/" />
    };

    return(
        <div>
            <h3>nice</h3>
        </div>
    )
}

export default TaskPage;
