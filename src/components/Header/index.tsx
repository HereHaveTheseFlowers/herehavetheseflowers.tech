import { useRef, useState } from 'react';
import { BouncyText } from '../BouncyText';

export function Header() {
    const [menuActive, setMenuActive] = useState(false);

    const menuButtonRef = useRef(null);

    const menuElementRef = useRef(null);

    const handleMenuButton = () => {
        if(!menuElementRef.current && !menuButtonRef.current) return;
        if(menuActive) {
            menuElementRef.current.classList.add('menu_state_hidden');
            setMenuActive(false)
        } else {
            menuElementRef.current.classList.remove('menu_state_hidden');
            setMenuActive(true)
        }
        menuButtonRef.current.classList.toggle('active');
    };

    return (
        <header className="header">
            <div className="header__logo">
                <BouncyText>HereHaveTheseFlowers</BouncyText>
            </div>
            <div className="header__menu">
                <div className="menu-button" ref={menuButtonRef} onClick={handleMenuButton}>
                    <svg style={{display: "none"}}>
                        <defs>
                            <filter id="gooeyness">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -11" result="gooeyness" />
                                <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
                            </filter>
                        </defs>
                    </svg>
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
            </div>
            <div className="menu menu_state_hidden" ref={menuElementRef}>

            </div>
        </header>
    );
}
  