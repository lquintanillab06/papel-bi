import React from 'react';
import { Outlet } from 'react-router-dom';
import PrincipalBar from '../components/layout/PrincipalBar';
import styled from "styled-components";

const ContenedorOutlet = styled.div`
 display: fixed;
 margin-top: 10vh;
 width:100vw;
 height:85vh;
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
