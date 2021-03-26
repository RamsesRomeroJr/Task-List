import React from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom";

function List ({list}){

    return (
        <div>{list.title}</div>
    )
}

export default List;
