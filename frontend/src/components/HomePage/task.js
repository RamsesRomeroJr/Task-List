import React from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom";

const TaskContainer = styled.div`
    border:solid 0.5px lightgrey;
    /* box-shadow: 0 1px 5px 0px rgba(0,0,0,0.6); */
    margin: 10px;

    &:hover{
        box-shadow: 0 5px 15px 0px rgb(0,140,151, 0.6);
    }
`

const Top = styled.div`
    display:flex;
    justify-content:space-between;
`
const Title = styled.h4`
    margin-left: 5px;
    margin-right: 20px;
    /* align-self:flex-start; */
    /* justify-self:flex-start; */
`

const Status = styled.h5`
    margin-right: 5px;
`
const CommentCount = styled.h5`
    margin:0px 0px 5px 5px;
`

function Task ({task}){

    return(
        <TaskContainer>
            <Top>
                <Title>{task.title}</Title>
                {!task.complete && <Status style={{color:'red'}}>Incomplete</Status>}
                {task.complete && <Status style={{color:'green'}}>Complete</Status>}
            </Top>
            {!task.Comments && <CommentCount> 0 Comments</CommentCount>}
            {task.Comments && <CommentCount> {task.Comments.length} Comments</CommentCount>}
        </TaskContainer>
    )
}

export default Task;
