import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Navbar, BlockGrid } from '../../components';
import firestoreController from '../../controllers/firestoreController';
import colorC from '../../controllers/colorController';

export function translateCategory(category: string, translateTo = 'ru') {
  let translatedCategory = category;
  if (translateTo === 'ru') {
    switch (category) {
      case 'web':
        translatedCategory = 'веб';
        break;
      case 'blog':
        translatedCategory = 'блог';
        break;
      case 'music':
        translatedCategory = 'музыка';
        break;
      case 'about me':
        translatedCategory = 'обо мне';
        break;
      case 'about-me':
        translatedCategory = 'обо мне';
        break;
    }
  } else if (translateTo === 'en') {
    switch (category) {
      case 'веб':
        translatedCategory = 'web';
        break;
      case 'блог':
        translatedCategory = 'blog';
        break;
      case 'музыка':
        translatedCategory = 'music';
        break;
      case 'обо мне':
        translatedCategory = 'about me';
        break;
      case 'обо-мне':
        translatedCategory = 'about me';
        break;
    }
  }
  return translatedCategory;
}

export default function Home() {
  const location = useLocation();
  const homeColor = '';
  let { category } = useParams();
  if (category) category = category.replaceAll('-', ' ');
  const selectedLang = location.pathname.includes('/ru') === true ? 'ru' : 'en';

  useEffect(() => {
    colorC.changeColor('#1e8e42');
    firestoreController.updateBlocks(selectedLang);
  }, []);

  if (selectedLang === 'ru') {
    category = translateCategory(category);
  }
  return (
    <>
      <Navbar category={category} lang={selectedLang} />
      <BlockGrid category={category} lang={selectedLang} />
    </>
  );
}
