import React from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom";

const ListContainer = styled.div`
    border:solid 0.5px lightgrey;
    box-shadow: 0 1px 5px 0px rgba(0,0,0,0.6);

    /* &:hover{
        box-shadow: 0 5px 15px 0px rgb(0,140,151, 0.6);
    } */
`

const Top = styled.div`
    display:flex;
    justify-content:center;
    align-self:flex-start;
`

const Title = styled.h3`
    color: rgb(0,140,151, 0.6);
`
const Mid = styled.div`
    display:flex;
    justify-content:center;
    align-self:flex-start;
`
const Creator = styled.h4`
    margin: 0px;
`

const Buttons = styled.div`
    height: 16px;
    align-self:center;
    padding-right: 30px;
    padding-left: 30px;

    &:hover{
        color: rgb(0,140,151, 0.6);
        cursor: pointer;
    }
`

function List ({list}){
    const user = list.User
    const tasks = list.Tasks

    return (
        <ListContainer>
            <Top>
                <Buttons>
                    <i class="fas fa-pen-square"></i>
                </Buttons>
                <Title>{list.title}</Title>
                <Buttons>
                    <i class="fas fa-trash"></i>
                </Buttons>
            </Top>
            <Mid>
                <Creator>Created By: {user.username}</Creator>
            </Mid>
        </ListContainer>
    )
}

export default List;
