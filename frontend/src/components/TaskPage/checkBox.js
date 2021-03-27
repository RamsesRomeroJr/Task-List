import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {checkTask, getTask} from '../../store/task.js'
const UnChecked = styled.div`
    height: 20px;
    align-self:center;
    color:red;
    cursor: pointer;
    `
const Checked = styled.div`
    height: 20px;
    align-self:center;
    color:green;
    cursor: pointer;
`


function CheckBox ({task}){
    const dispatch = useDispatch()

    function check (){
        dispatch(checkTask({taskId:task.id}))
    }
    return (
        <div>
            {!task.complete && (
                <UnChecked onClick={check}>
                    <i class="far fa-square fa-2x"></i>
                </UnChecked>
            )}
            {task.complete && (
                <Checked onClick={check}>
                    <i class="far fa-check-square fa-2x"></i>
                </Checked>
            )}

        </div>
    )
}

export default CheckBox;
