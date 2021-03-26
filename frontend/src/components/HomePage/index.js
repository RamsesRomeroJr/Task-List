import React, {useEffect} from 'react';
import styled from 'styled-components'
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getLists} from '../../store/lists.js'
import List from './list.js'

const Title = styled.div`
    display:flex;
    justify-content:center;
`

const ListsContainer = styled.div`
    display:flex;
    justify-content:center;
    /* flex-direction:column; */
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
            <Title style={{display:"flex", justifyContent:"center"}}>
                <h1>Lists</h1>
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
