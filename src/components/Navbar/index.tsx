import { useRef, useState } from 'react';
import { BouncyText } from '../BouncyText';
import { useLocation, useNavigate } from 'react-router-dom';
import { BouncyButton } from '../BouncyButton';
import { Button } from '../Button';
import { Palette } from '../Palette';
import React from 'react';
import store from '../../utils/Store';
import { RouterList } from '../../router/routerList';
import firestoreController from '../../controllers/firestoreController'

type NavbarProps = {
    lang: string;
    category?: string;
}

export function Navbar(props: NavbarProps) {
    const [menuActive, setMenuActive] = useState(false);
    const [paletteActive, setPaletteActive] = useState(false);

    const navigate = useNavigate();

    const menuPaletteRef = React.createRef();
    const menuElementRef = useRef(null);
    const langSwitcherRef = useRef(null);

    const categories = store.getState().categories;

    const handleMenuButton = () => {
        if(!menuElementRef.current) return;
        if(menuActive) {
            menuElementRef.current.classList.add('menu_state_hidden');
            setMenuActive(false)
        } else {
            menuElementRef.current.classList.remove('menu_state_hidden');
            setMenuActive(true)
        }
        document.querySelector('.navbar__menu')?.classList.toggle('active');
    };
    
    const handlePaletteButton = () => {
        if(!menuPaletteRef.current) return;
        const palette = menuPaletteRef.current as HTMLDivElement
        if(paletteActive) {
            palette.classList.add('palette_state_hidden');
            setPaletteActive(false)
        } else {
            palette.classList.remove('palette_state_hidden');
            setPaletteActive(true)
        }
        document.querySelector('.navbar__palette')?.classList.toggle('active');
        

    };

    const handleThemeSwitcher = () => {
        document.querySelector('.themeswitcher__semicircle')?.classList.toggle('active');
        document.querySelector('.themeswitcher')?.classList.toggle('active');
        if(store.getState().theme === "dark") {
            store.set("theme", "light")
            window.localStorage.setItem("theme", "light");
        } else {
            store.set("theme", "dark")
            window.localStorage.setItem("theme", "dark");
        }
    };

    const location = useLocation();
    const handleLangSwitcher = () => {
        console.log(props.lang)
        if(props.lang === "en") {
            const newPathname = location.pathname === "/" ? "/ru" : "/ru" + location.pathname
            navigate(newPathname)
            firestoreController.updateBlocks("ru")
        } else {
            const newPathname = location.pathname.replace("/ru", "") === "" ? "/" : location.pathname.replace("/ru", "")
            navigate(newPathname)
            firestoreController.updateBlocks("en")
        }
        if(!langSwitcherRef.current) return
        if(langSwitcherRef.current.style.transform) {
            langSwitcherRef.current.style.transform = ""
        } else {
            langSwitcherRef.current.style.transform = "rotate(360deg)"
        }
    }

    return (
        <header className="navbar">
            <div className="navbar__logo" onClick={()=>{navigate(RouterList.HOME)}}>
                <BouncyText>HereHaveTheseFlowers</BouncyText>
            </div>
            {props.category && <div className="navbar__category">• {props.category}</div>}
            <div className="navbar__buttons">
                
                <Button className="navbar__palette">
                    <span onClick={handlePaletteButton}>COLOR</span>
                    <Palette ref={menuPaletteRef} />
                </Button>
                <Button className="navbar__menu" onClick={handleMenuButton}>MENU</Button>
                
                {/* 
                <BouncyButton onClick={handlePaletteButton} svgRef={menuPaletteRef}>
                    <div className="palette-button" ref={menuPaletteRef}>
                        <svg style={{display: "none"}}>
                            <defs>
                                <filter id="gooeyness">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooeyness" />
                                    <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
                                </filter>
                            </defs>
                        </svg>
                        <svg className="palette-button__svg" version="1.1" height="50" width="50" viewBox="0 0 50 50">  
                            <path d="M40.61931 39.55813c-.07605-1.80089-2.78325-7.1559-2.71935-9.234.0729-2.3562 1.498-5.25825 4.46535.4149 1.77795 3.39975 4.5072 1.2843 4.8384-.36989 1.00035-5.004-.4851-11.0061-5.21595-16.88715C33.805 3.31153 19.42206.51838 9.87081 7.24408.32 13.97068.12786 29.11768 8.84346 37.89628c7.89975 7.95421 18.79425 11.45025 27.90315 7.61671a5.6711 5.6711 0 0 0 3.8727-5.95486Zm-25.5861-29.4903a3.81717 3.81717 0 1 1-.92385 5.319 3.81658 3.81658 0 0 1 .92385-5.319Zm-7.4421 15.51285a3.81762 3.81762 0 1 1 5.31945.923 3.81727 3.81727 0 0 1-5.31945-.923Zm18.52875-9.93555a3.81736 3.81736 0 1 1 5.31855.92295 3.81575 3.81575 0 0 1-5.31855-.92295Zm-12.91275 19.6785a3.81782 3.81782 0 1 1 5.319.922 3.81946 3.81946 0 0 1-5.319-.922Z"/>
                        </svg>
                    </div>
                </BouncyButton>
                <BouncyButton onClick={handleMenuButton} svgRef={menuButtonRef}>
                    <div className="menu-button" ref={menuButtonRef}>
                        <svg className="menu-button__svg menu-button__burger" version="1.1" height="50" width="50" viewBox="0 0 50 50">  
                            <path className="menu-button__line menu-button__line_1"  d="M25,10H5"/>
                            <path className="menu-button__line menu-button__line_2"  d="M25,10H45"/>
                            <path className="menu-button__line menu-button__line_3"  d="M25,25H5"/>
                            <path className="menu-button__line menu-button__line_4"  d="M25,25H45"/>
                            <path className="menu-button__line menu-button__line_5"  d="M25,40H5"/>
                            <path className="menu-button__line menu-button__line_6"  d="M25,40H45"/>
                        </svg>
                        <svg className="menu-button__svg menu-button__x" version="1.1" height="50" width="50" viewBox="0 0 50 50">
                            <path className="menu-button__line menu-button__x-line" d="M9,7,41,43" />
                            <path className="menu-button__line menu-button__x-line" d="M41,7,9,43" />
                        </svg>
                    </div>
                </BouncyButton> */}
            </div>

            <div className="menu menu_state_hidden" ref={menuElementRef}> 
                {categories.map((category: string, index: number) => {
                    return (
                        <div key={`${category} name`} className="menu__category" onClick={()=>{navigate(`/${category.replaceAll(" ", "-")}`)}}>
                            <BouncyText>{category}</BouncyText>
                        </div>
                    )
                })}
                <div className="menu__footer">
                    <button className="themeswitcher" onClick={handleThemeSwitcher}>
                        <div className={`themeswitcher__semicircle ${store.getState().theme === "dark" ? "active" : ""}`} />
                    </button>
                    <button className="langswitcher" onClick={handleLangSwitcher} ref={langSwitcherRef}>
                        {props.lang.toUpperCase()}
                    </button>
                </div>
            </div>
        </header>
    );
}
  