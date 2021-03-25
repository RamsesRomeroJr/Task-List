import React, { useState } from 'react';
import styled from 'styled-components'
import SignupFormPage from '../SignupFormPage/index.js'

const Splash = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
`

const Container = styled.div`
    display:flex;
    justify-content:space-around;
    height: 500px;
    width: 700px;
    margin-top: 100px;
    border: 1px solid rgba(0,0,0,0.8);
`
const LeftSide = styled.div`
    display:flex;
    background-color: rgb(0,140,151);
    justify-content:center;
    align-items: center;
    width:200px;
`

const RightSide = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top: 40px;
    /* justify-content:center; */
`
const Title = styled.h1`
    font-weight:bolder;
    color: white;
`
const Buttons = styled.div`
    display:flex;
`

const SignUpButton = styled.button`
    width:75px;
    margin-bottom:4px;
    margin-top:4px;
    background-color:#FCFAF0;
    border:solid 0.5px lightgrey;
    color:grey;
    box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
    outline:none;
    &:hover{
        border:solid 0.5px lightgrey;
        box-shadow: 0 3px 4px 0px rgba(0,0,0,0.6);
        font-weight:600;
    }
    `
const LoginButton = styled.button`
    width:75px;
    margin-bottom:4px;
    margin-top:4px;
    background-color:#FCFAF0;
    border:solid 0.5px lightgrey;
    color:grey;
    box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
    outline:none;
    &:hover{
        border:solid 0.5px lightgrey;
        box-shadow: 0 3px 4px 0px rgba(0,0,0,0.6);
        font-weight:600;
    }
`

function SplashPage(){

    let [signupForm, setSignupForm] = useState(true);

    return(
        <Splash>
            <Container>
                <LeftSide>
                    <Title> Trustero<br/> Assignment</Title>
                </LeftSide>
                <RightSide>
                    <Buttons>
                        <SignUpButton onClick={() => setSignupForm(true)}>Sign Up</SignUpButton>
                        <LoginButton onClick={() => setSignupForm(false)}>Login</LoginButton>
                    </Buttons>
                    {signupForm &&
                        <SignupFormPage />
                    }
                    {!signupForm &&
                        <h1> login component</h1>
                    }
                </RightSide>
            </Container>
        </Splash>
    )
}

export default SplashPage;
