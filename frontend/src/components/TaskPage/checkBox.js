import React, {useState, useEffect} from 'react'
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
    const [isComplete, setIsComplete] = useState(task.complete)
    const dispatch = useDispatch()

    function check (){
        dispatch(checkTask({taskId:task.id}))
        setIsComplete(!task.complete)
    }
    return (
        <div>
            {!isComplete && (
                <UnChecked onClick={check}>
                    <i class="far fa-square fa-2x"></i>
                </UnChecked>
            )}
            {isComplete && (
                <Checked onClick={check}>
                    <i class="far fa-check-square fa-2x"></i>
                </Checked>
            )}

        </div>
    )
}

export default CheckBox;
