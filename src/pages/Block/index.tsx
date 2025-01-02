import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components';
import firestoreController from '../../controllers/firestoreController';
import { translateCategory } from '../Home';
import type { BlockProps } from '../../components/BlockGrid';
import store from '../../utils/Store';
import { dateOptionsBlock } from '../../constants/dateOptions';
import colorC from '../../controllers/colorController';

export default function Block() {
  const location = useLocation();
  let { blockId } = useParams();
  let { category } = useParams();
  const navigate = useNavigate();
  const [currentBlock, setCurrentBlock] = useState(
    store.getState().blocks.find((block: BlockProps) => block.id === blockId)
  );
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const isMobile: boolean = window.matchMedia('(max-device-width: 480px)').matches;
  const selectedLang = location.pathname.includes('/ru') === true ? 'ru' : 'en';
  useEffect(() => {
    firestoreController.updateBlocks(selectedLang);
    const updateCurrentBlock = () => {
      setCurrentBlock(store.getState().blocks.find((block: BlockProps) => block.id === blockId));
    };
    store.on('blocks', updateCurrentBlock);
  }, []);
  if (selectedLang === 'ru') {
    category = translateCategory(category);
  }

  if (currentBlock) {
    const { date, name, thumbnailURL, website, color } = currentBlock;
    let content = String(currentBlock.content);

    colorC.changeColor(color);

    const linksArray = [];

    while (content.lastIndexOf('[link]') != -1) {
      linksArray.push(content.slice(content.lastIndexOf('[link]'), content.length));
      content = content.slice(0, content.lastIndexOf('[link]'));
    }

    const contentArray = content.split('[br]');

    let displayedDate = '---';
    if (date) {
      const blockDate = new Date(date.seconds * 1000);
      const localeLang = location.pathname.includes('/ru') === true ? 'ru' : 'en-US';
      displayedDate = blockDate
        .toLocaleString(localeLang, dateOptionsBlock)
        .replace('.', '')
        .toLowerCase();
      const currentYear = new Date().getFullYear();
      if (blockDate.getFullYear() !== currentYear) {
        displayedDate += ` ${blockDate.getFullYear()}`;
      }
    }

    const navigateToBlockCategory = () => {
      if (!category) return;
      navigate(
        `${location.pathname.includes('/ru') ? '/ru' : ''}/${translateCategory(category, 'en').replaceAll(' ', '-')}`
      );
    };
    return (
      <>
        <Navbar category={category} lang={selectedLang} />
        <article className='block-article'>
          <section className='block-article__thumbnail-wrapper'>
            <img
              className={`block-article__thumbnail-image ${imageLoading ? 'image_state_unloaded' : 'image_state_loaded'}`}
              src={thumbnailURL}
              alt={`${name} thumbnail`}
              draggable='false'
              onLoad={() => {
                handleImageLoaded();
              }}
            />
            {imageLoading && <div className='block-article__thumbnail-image skeleton-image' />}
          </section>
          <section className='block-article__info'>
            <div className='block-article__name'>
              {name} <br />
              {website && (
                <a
                  className='block-article__website-link underlined'
                  href={website}
                  target='_blank'>
                  {website.replace('https://', '') + ' ↗'}
                </a>
              )}
            </div>
            <div className='block-article__content'>
              {contentArray.map((paragraph: string, index: number) => {
                const isFirstChild = index === 0 ? true : false;
                return (
                  <span key={index}>
                    {!isFirstChild && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                    {paragraph}
                  </span>
                );
              })}

              {linksArray &&
                linksArray.map((link: string, index: number) => {
                  return (
                    <div key={index}>
                      <a
                        className='block-article__content-link underlined'
                        href={link.slice(link.indexOf('(') + 1, link.indexOf(';'))}
                        target='_blank'>
                        {`${link.slice(link.indexOf(';') + 1, link.indexOf(')'))} ↗`}
                      </a>
                      <br />
                      <br />
                    </div>
                  );
                })}
            </div>
            <div className='block-article__footer'>
              <div className='block-article__category'>
                <span
                  className='block-article__category-span underlined'
                  onClick={navigateToBlockCategory}>
                  {`${location.pathname.includes('/ru') === true ? 'категория' : 'category'}`}:{' '}
                  {category} | {'\xa0'}
                </span>
              </div>
              <div className='block-article__date'>
                {`${location.pathname.includes('/ru') === true ? 'когда' : 'when'}`}:{' '}
                {displayedDate.toLowerCase()}
              </div>
            </div>
          </section>
        </article>
      </>
    );
  } else {
    return (
      <>
        <Navbar category={category} lang={selectedLang} />
        <article className='block-article'>
          <section className='block-article__thumbnail-wrapper'>
            <div className='block-article__thumbnail-image skeleton-image' />
          </section>
          <section className='block-article__info'>
            <div className='block-article__name'>
              <span className='block-article__name skeleton-box' style={{ width: '30%' }}>
                {'\xa0'}
              </span>{' '}
              <br />
              <span className='block-article__website-link skeleton-box' style={{ width: '30%' }}>
                {'\xa0'}
              </span>
            </div>
            <div className='block-article__content'>
              <span className='skeleton-box' style={{ width: '100%' }}>
                {'\xa0'}
              </span>
              <br />
              <br />
              <span className='skeleton-box' style={{ width: '100%' }}>
                {'\xa0'}
              </span>
              <br />
              <br />
            </div>
            <div className='block-article__footer  skeleton-box'>{'\xa0'}</div>
          </section>
        </article>
      </>
    );
  }
}
