import React, { useState } from 'react';
import styled from 'styled-components'

const Splash = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
`

const Container = styled.div`
    display:flex;
    justify-content:space-around;
    height: 400px;
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

    &:hover{
        background-color: rgb(0,140,151);
        color:white;
    }
    `
const LoginButton = styled.button`
    &:hover{
        background-color: rgb(0,140,151);
        color:white;
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
                        <h1> sign up component</h1>
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
