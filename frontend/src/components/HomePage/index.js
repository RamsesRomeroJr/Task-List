import React, {useEffect} from 'react';
import styled from 'styled-components'
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getLists} from '../../store/lists.js'
import AddListButton from './addListButton.js'
import List from './list.js'

const Title = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
`

const ListsContainer = styled.div`
    box-sizing:border-box;
    display: flex;
    flex-direction:row;
    width: auto;
    flex-wrap:wrap;
    /* grid-template-columns: repeat(auto-fill,390px); */
    justify-content: space-evenly;
    /* grid-auto-rows: auto; */
    /* grid-gap: 27px; */
    padding-top: 15px;
    padding-bottom: 50px;
`
function HomePage (){
    const dispatch = useDispatch()
    const sessionUser = useSelector((state)=> state.session.user)
    const allLists = useSelector((state)=> state.homePage.lists)
    useEffect(() =>{
        dispatch(getLists())
    }, [dispatch]);

    if (!sessionUser){
        return <Redirect to="/" />
    };


    return(
        <div>
            <Title>
                <h1>Lists</h1>
                <AddListButton userId={sessionUser.id}/>
            </Title>
            <ListsContainer>
                {!allLists && <h2>Sorry No Current Lists</h2>}
                {allLists && allLists.map(list => {
                    return <List key={list.id} list={list} />
                })}
            </ListsContainer>
        </div>
    )
}

export default HomePage;
