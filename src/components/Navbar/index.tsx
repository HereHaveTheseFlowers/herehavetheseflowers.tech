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
  const navigate = useNavigate();

  const langSwitcherRef = useRef(null);
  const isMobile: boolean = window.matchMedia('(max-device-width: 500px)').matches;

  const navigateToCategory = () => {
    if (!props.category) return;
    navigate(
      `${location.pathname.includes('/ru') ? '/ru' : ''}/${translateCategory(props.category, 'en').replaceAll(' ', '-')}`
    );
  };

  const handleThemeSwitcher = () => {
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
        <button className='langswitcher' onClick={handleLangSwitcher} ref={langSwitcherRef}>
          <span className='langswitcher__span'>{props.lang === 'ru' ? 'EN' : 'RU'}</span>
        </button>

        <button
          className={`themeswitcher ${store.getState().theme === 'dark' ? 'active' : ''}`}
          onClick={handleThemeSwitcher}></button>
      </div>
    </header>
  );
}
