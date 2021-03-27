import React from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom";
import Task from './task.js'
import {deleteList} from '../../store/lists.js'
import {useDispatch, useSelector} from 'react-redux'
import EditList from '../EditList/index.js'
import AddTaskButton from './addTaskButton'

const ListContainer = styled.div`
    border:solid 0.5px lightgrey;
    box-shadow: 0 1px 5px 0px rgba(0,0,0,0.6);
    margin-top:20px;
`

const Top = styled.div`
    display:flex;
    justify-content:space-around;
    align-self:center;
`

const Title = styled.h3`
    color: rgb(0,140,151, 0.6);
`
const Mid = styled.div`
    display:flex;
    justify-content:center;
    align-self:flex-start;
`
const Creator = styled.h5`
    margin: 0px;
`

const Bottom = styled.div`
    display:flex;
    justify-content:center;
    align-self:flex-start;
`

const Buttons = styled.div`
    height: 16px;
    align-self:center;

    &:hover{
        color: rgb(0,140,151, 0.6);
        cursor: pointer;
    }
`

const TaskTitle = styled.h4`
    margin:20px 0px 0px 20px;
    font-weight:bolder;
`

const TaskContainer = styled.div`
    box-sizing:border-box;
    display: grid;
    grid-template-rows: repeat(auto-fill);
    grid-gap: 10px;
    margin-bottom:10px;
    cursor: pointer;
`

function List ({list}){
    const user = list.User
    const tasks = list.Tasks
    const sessionUser = useSelector((state) => state.session.user)

    const dispatch = useDispatch()

    function deleteListClick (){
        dispatch(deleteList({userId: sessionUser.id, listId: list.id}))
    }

    return (
        <ListContainer>
            <Top>
                {(sessionUser.id === list.userId)?
                <EditList userId={sessionUser.id} listId={list.id} listTitle={list.title}/> :
                <></>}
                <Title>{list.title}</Title>
                {(sessionUser.id === list.userId)?

                <Buttons onClick={deleteListClick}>
                    <i class="fas fa-trash"></i>
                </Buttons> :
                <></>
                }
            </Top>
            <Mid>
                <Creator>Created By: {user.username}</Creator>
            </Mid>
            <TaskTitle>Tasks: </TaskTitle>
            <AddTaskButton userId={sessionUser.id} listId={list.id}/>
            <Bottom>
                <TaskContainer>
                    {!tasks && <h4>No Current Tasks</h4>}
                    {tasks && tasks.map((task) =>{
                        return <Task key={task.id} task={task} />
                    })}
                </TaskContainer>
            </Bottom>
        </ListContainer>
    )
}

export default List;
