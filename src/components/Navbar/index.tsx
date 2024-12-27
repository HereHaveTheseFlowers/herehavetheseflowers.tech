import { useRef, useState } from 'react';
import { BouncyText } from '../BouncyText';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import React from 'react';
import store from '../../utils/Store';
import firestoreController from '../../controllers/firestoreController';
import { translateCategory } from '../../pages/Home';

type NavbarProps = {
  lang: string;
  category?: string;
};

export function Navbar(props: NavbarProps) {
  const [menuActive, setMenuActive] = useState(false);
  const [paletteActive, setPaletteActive] = useState(false);

  const navigate = useNavigate();

  const menuPaletteRef = React.createRef();
  const menuElementRef = useRef(null);
  const langSwitcherRef = useRef(null);

  const categories = store.getState().categories;

  const isMobile: boolean = window.matchMedia('(max-device-width: 480px)').matches;

  const navigateToCategory = () => {
    if (!props.category) return;
    navigate(
      `${location.pathname.includes('/ru') ? '/ru' : ''}/${translateCategory(props.category, 'en').replaceAll(' ', '-')}`
    );
  };

  const handleMenuButton = () => {
    if (!menuElementRef.current) return;
    if (menuActive) {
      menuElementRef.current.classList.add('menu_state_hidden');
      setMenuActive(false);
    } else {
      menuElementRef.current.classList.remove('menu_state_hidden');
      setMenuActive(true);
    }
    document.querySelector('.navbar__menu')?.classList.toggle('active');
  };

  const handlePaletteButton = () => {
    if (!menuPaletteRef.current) return;
    const palette = menuPaletteRef.current as HTMLDivElement;
    if (paletteActive) {
      palette.classList.add('palette_state_hidden');
      setPaletteActive(false);
    } else {
      palette.classList.remove('palette_state_hidden');
      setPaletteActive(true);
    }
    document.querySelector('.navbar__palette')?.classList.toggle('active');
  };

  const handleThemeSwitcher = () => {
    document.querySelector('.themeswitcher__semicircle')?.classList.toggle('active');
    document.querySelector('.themeswitcher')?.classList.toggle('active');
    window.dispatchEvent(new Event('colorchange'));
    if (store.getState().theme === 'dark') {
      store.set('theme', 'light');
      window.localStorage.setItem('theme', 'light');
    } else {
      store.set('theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    }
  };

  const location = useLocation();
  const handleLangSwitcher = () => {
    if (!langSwitcherRef.current) return;
    if (langSwitcherRef.current.style.transform) {
      langSwitcherRef.current.style.transform = '';
    } else {
      langSwitcherRef.current.style.transform = 'rotate(360deg)';
    }
    setTimeout(() => {
      if (props.lang === 'en') {
        const newPathname = location.pathname === '/' ? '/ru' : '/ru' + location.pathname;
        navigate(newPathname);
        firestoreController.updateBlocks('ru');
      } else {
        const newPathname =
          location.pathname.replace('/ru', '') === '' ? '/' : location.pathname.replace('/ru', '');
        navigate(newPathname);
        firestoreController.updateBlocks('en');
      }
    }, 350);
  };

  return (
    <header className='navbar'>
      <div
        className='navbar__logo'
        onClick={() => {
          navigate(location.pathname.includes('/ru') ? '/ru' : '/');
        }}>
        <BouncyText>{isMobile ? 'HHTF' : 'HereHaveTheseFlowers'}</BouncyText>
      </div>
      {props.category && (
        <div className='navbar__category' onClick={navigateToCategory}>
          • <BouncyText>{props.category}</BouncyText>
        </div>
      )}
      <div className='navbar__buttons'>
        <button
          className={`themeswitcher ${store.getState().theme === 'dark' ? 'active' : ''}`}
          onClick={handleThemeSwitcher}>
          <div
            className={`themeswitcher__semicircle ${store.getState().theme === 'dark' ? 'active' : ''}`}
          />
        </button>
        <button className='langswitcher' onClick={handleLangSwitcher} ref={langSwitcherRef}>
          {props.lang === 'ru' ? 'EN' : 'RU'}
        </button>
      </div>
    </header>
  );
}
