import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {updateList} from '../../store/lists.js';
import styled from 'styled-components'

const EditButton = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
`
const ListForm = styled.div`
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

const Input = styled.input`
  margin-bottom:20px;
  margin-top:10px;
  padding: 8px 0 8px 8px;
  border:solid 0.5px lightgrey;
  box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
  justify-self: center;
  background-color:#FCFAF0;
  color:grey;
  outline:none;
`;

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

function EditList({userId,listId, listTitle}){
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState(listTitle)

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
        dispatch(updateList({userId, title, listId}))
        closeForm()
    }

    return(
        <>
        <EditButton onClick={openForm}>
            <i class="fas fa-pen-square"></i>
        </EditButton>
        {showForm && (
        <form onSubmit={handleSubmit}>
            <ListForm>
                <h3>Edit Title</h3>
                <Input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                <UpdateButton type='submit'>Edit Title</UpdateButton>
                <UpdateButton type='button' onClick={closeForm}>Cancel</UpdateButton>
            </ListForm>
        </form>
        )}
        </>
    )


}

export default EditList;
