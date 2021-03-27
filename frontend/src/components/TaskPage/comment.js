import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {deleteComment} from '../../store/task.js'
import EditComment from './editComment'

const UserComment = styled.h4`
    color:rgba(0,140,151, 0.6);
`

const CommentContent = styled.h4`

`
const CommentContainer = styled.div`
    display:flex;
    justify-content:space-around;
    /* align-items: center; */
    flex-direction: row;
    border-top:1px solid grey;
    margin:0px;
    box-sizing:border-box;
`

const Buttons = styled.div`
    height: 16px;
    align-self:center;

    &:hover{
        color: rgb(0,140,151, 0.6);
        cursor: pointer;
    }
`
const Content = styled.div`
    display:flex;
    /* justify-content:center; */
    /* align-items: center; */
    flex-direction: row;
    /* border-top:1px solid grey; */
    margin:0px;
    box-sizing:border-box;
`

const ActionButtons = styled.div`
    display:flex;
    justify-content:space-between;
    /* align-items: center; */
    flex-direction: row;
    /* margin-left:10px; */
    box-sizing:border-box;
`
function Comment ({comment, task, user}){
    const dispatch = useDispatch()

    function deleteCommentClick(){
        dispatch(deleteComment({taskId:task.id, commentId: comment.id}))
    }

    return(
        <CommentContainer>
            <Content>
                <UserComment>{comment.User.username}: </UserComment>
                <CommentContent> {comment.content}</CommentContent>
            </Content>
            <ActionButtons>
                {(user.id === task.List.userId || user.id === task.userId || user.id === comment.User.id)?
                        <EditComment taskId={task.id} content={comment.content} commentId={comment.id}/> :
                        <></>}
                {(user.id === task.List.userId || user.id === task.userId || user.id === comment.User.id)?
                        <Buttons onClick={deleteCommentClick}>
                            <i class="fas fa-trash"></i>
                        </Buttons> :
                        <></>
                    }
            </ActionButtons>
        </CommentContainer>
    )
}

export default Comment;
