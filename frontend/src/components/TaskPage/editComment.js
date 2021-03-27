import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {updateComment} from '../../store/task.js';
import styled from 'styled-components'

const EditButton = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
    margin-right:10px;

    &:hover{
        color: rgb(0,140,151, 0.6);
        cursor: pointer;
    }
`
const TaskForm = styled.div`
    display:flex;
    flex-direction:column;
    position: absolute;
    background-color: white;
    border-radius: 10px;
    border: 1px solid rgb(0,140,151, 0.6);
    padding: 10px;
    margin-top: 4px;
    align-items:center;
`

const Text = styled.textarea`
    margin-bottom:20px;
    margin-top:10px;
    padding: 8px 0 8px 8px;
    border:solid 0.5px lightgrey;
    box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
    justify-self: center;
    background-color:#FCFAF0;
    color:grey;
    outline:none;
`

const UpdateButton = styled.button`
  width:75px;
  margin-bottom:4px;
  margin-top:4px;
  background-color:#FCFAF0;
  border:solid 0.5px lightgrey;
  color:grey;
  box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
  outline:none;
  cursor: pointer;
  &:hover{
    border:solid 0.5px lightgrey;
    box-shadow: 0 3px 4px 0px rgba(0,0,0,0.6);
    font-weight:600;
  }
`;

function EditComment({taskId, content, commentId}){
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [commentContent, setContent] = useState(content)

    const openForm = () => {
        if(showForm) return;
        setShowForm(true);
    };

    const closeForm = () => {
        if (!showForm) return;
        setShowForm(false);
    };
    useEffect(() => {
        if (!showForm) return;
        closeForm()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateComment({taskId, content:commentContent, commentId}))
        closeForm()
    }

    return(
        <>
        <EditButton onClick={openForm}>
            <i class="fas fa-pen-square"></i>
        </EditButton>
        {showForm && (
        <form onSubmit={handleSubmit}>
            <TaskForm>
                <h3>Edit Comment</h3>
                <Text
                    type='text'
                    value={commentContent}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    />
                <UpdateButton type='submit'>Confirm</UpdateButton>
                <UpdateButton type='button' onClick={closeForm}>Cancel</UpdateButton>
            </TaskForm>
        </form>
        )}
        </>
    )


}

export default EditComment;
