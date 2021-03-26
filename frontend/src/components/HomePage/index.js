import React, {useEffect} from 'react';
import styled from 'styled-components'
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getLists} from '../../store/lists.js'

function HomePage (){
    const dispatch = useDispatch()
    const sessionUser = useSelector((state)=> state.session.user)
    useEffect(() =>{
        dispatch(getLists())
    }, [dispatch]);

    if (!sessionUser){
        return <Redirect to="/" />
    };


    return(
        <div>
            <h1>all lists</h1>
        </div>
    )
}

export default HomePage;
