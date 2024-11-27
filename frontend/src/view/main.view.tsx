import { Outlet, useNavigate } from 'react-router-dom';
import ButtonFactory from '../components/Button';
import global, { initialContext } from '../app/context';
import './MainView.css';
import React, { useState } from 'react';

const menuMap = {
    "Solicitaçao de Viagem": "/ride/1",
    "Historico de Viagens": "/history",
    "Moobe": ""
}

type Buttons = {
    "Solicitaçao de Viagem": void;
    "Historico de Viagens": void;
}

export default function MainView() {
    const [menuSelected, setMenuSelected] = useState('');
    const nav = useNavigate();

    const handleOnClick = (element: React.MouseEvent<HTMLElement>) => {
        const menu = element.currentTarget.innerHTML as keyof typeof menuMap;
        setMenuSelected(menu);
        nav(menuMap[menu]);
    }

    let tab = 0;
    const elementNav = ButtonFactory.createButtons<Buttons>([
        {
            label: "Solicitaçao de Viagem",
            onClick: handleOnClick,
            type: 'menu',
            tab: tab += 1
        },
        {
            label: "Historico de Viagens",
            onClick: handleOnClick,
            type: 'menu',
            tab: tab += 1
        }
    ]);
    return (
        <>
            <header className='basic-button' onClick={handleOnClick}>
                <h1> Moobe </h1>
            </header>
            <nav>
                {elementNav["Solicitaçao de Viagem"]}
                {elementNav["Historico de Viagens"]}
            </nav>
            <main>
                <global.Provider value={{ ...initialContext, tab, menuSelected }}>
                    <Outlet />
                </global.Provider>
            </main>
            <footer> developed by Leandro Carvalho</footer>
        </>
    );
}