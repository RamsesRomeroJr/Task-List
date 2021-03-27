import React, {useEffect} from 'react';
import styled from 'styled-components'
import { Redirect, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getTask, deleteTask} from '../../store/task.js'
import CheckBox from './checkBox'
import EditTask from './editTask.js'
import Comment from './comment'
import PostComment from './postComment'

const TitleContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    margin:0px;
    box-sizing:border-box;
`

const TitleText = styled.h1`
    color: rgba(0,140,151, 0.6);
    /* padding-right: 20px; */
`

const Title = styled.div`
    display:flex;
    justify-content:space-around;
    align-self:center;
    width:200px;
`

const OtherText = styled.h5`
    margin: 5px 0px;
`
const Buttons = styled.div`
    height: 16px;
    align-self:center;

    &:hover{
        color: rgb(0,140,151, 0.6);
        cursor: pointer;
    }
`

const InfoContainer = styled.div`
    display:flex;
    justify-content:center;
    /* align-items: center; */
    flex-direction: row;
    margin:0px;
    box-sizing:border-box;
`

const Info = styled.div`
    border:solid 0.5px lightgrey;
    box-shadow: 0 1px 5px 0px rgba(0,0,0,0.6);
    margin-top:20px;
`

function TaskPage (){
    const dispatch = useDispatch()
    const {id} = useParams()

    const sessionUser = useSelector((state)=> state.session.user)
    const task = useSelector((state)=> state.taskPage.task)

    useEffect(async() => {
        dispatch(getTask(id)
        )
    }, []);

    if (!sessionUser){
        return <Redirect to="/" />
    };

    if(!task){
        return <h3>Loading..</h3>
    }

    return(
        <div>
            <TitleContainer>
                <Title>
                    {(sessionUser.id === task.List.userId || sessionUser.id === task.userId)?
                    <EditTask userId={sessionUser.id} taskId={task.id} taskTitle={task.title} taskDescription= {task.description}/> :
                    <></>}
                    <TitleText>{task.title}</TitleText>
                    {(sessionUser.id === task.List.userId || sessionUser.id === task.userId)?
                    <Buttons >
                        <i class="fas fa-trash"></i>
                    </Buttons> :
                    <></>
                    }
                </Title>
                <OtherText>Created by: {task.User.username}</OtherText>
                <OtherText>List: {task.List.title}</OtherText>
                <CheckBox task={task}/>
            </TitleContainer>
            <InfoContainer>
                <Info>
                    <h3>Description: </h3>
                    <h4>{task.description}</h4>
                    <br/>
                    <h3>Comments: </h3>
                    {!task.Comments && <h2>Leave A Comment Below</h2>}
                    {task.Comments && task.Comments.map(comment => {
                        return <Comment key={comment.id} comment={comment} task={task} user={sessionUser}/>
                    })}
                    <br/>
                </Info>
                <PostComment userId={sessionUser.id} taskId={task.id} />
            </InfoContainer>
        </div>
    )
}

export default TaskPage;
