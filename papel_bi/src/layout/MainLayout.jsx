import React from 'react';
import { Outlet } from 'react-router-dom';
import PrincipalBar from '../components/layout/PrincipalBar';
import styled from "styled-components";

const ContenedorOutlet = styled.div`
 display: fixed;
 width:100vw;
 height:90vh;
 margin: 10vh 0 0 0;
 padding:0;
`;


const MainLayout = () => {
    return (
        <div>
            <PrincipalBar />
            <ContenedorOutlet>
               <Outlet />
            </ContenedorOutlet>
        </div>
    );
}

export default MainLayout;
