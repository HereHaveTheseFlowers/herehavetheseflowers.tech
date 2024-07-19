import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components';
import firestoreController from '../../controllers/firestoreController';
import { translateCategory } from '../Home';
import type { BlockProps } from '../../components/BlockGrid';
import store from '../../utils/Store';
import { dateOptionsBlock } from '../../constants/dateOptions';

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
    const { date, name, thumbnailURL, website, content, github } = currentBlock;

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
    if (!imageLoading) {
      return (
        <>
          <Navbar category={category} lang={selectedLang} />
          <article className='block-article'>
            <section className='block-article__thumbnail-wrapper'>
              <img
                className='block-article__thumbnail-image image_state_loaded'
                src={thumbnailURL}
                alt={`${name} thumbnail`}
                draggable='false'
              />
            </section>
            <section className='block-article__info'>
              <div className='block-article__name'>
                {name} <br />
                {website && (
                  <a className='block-article__link' href={website} target='_blank'>
                    {website.replace('https://', '')}
                  </a>
                )}
              </div>
              <div className='block-article__content'>
                {contentArray.map((paragraph: string, index: number) => {
                  return (
                    <span key={index}>
                      {paragraph}
                      <br />
                      <br />
                    </span>
                  );
                })}

                {github && (
                  <a className='block-article__github' href={github} target='_blank'>
                    {`${location.pathname.includes('/ru') === true ? 'ссылка на репо' : 'github repo'}`}
                  </a>
                )}
              </div>
              <div className='block-article__footer'>
                <div className='block-article__category'>
                  <span
                    className='block-article__category-span underlined'
                    onClick={navigateToBlockCategory}
                  >
                    {`${location.pathname.includes('/ru') === true ? 'категория' : 'category'}`}:{' '}
                    {category} |
                  </span>
                </div>
                <div className='block-article__date'>
                  <br />
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
              <img
                className='block-article__thumbnail-image image_state_unloaded'
                src={thumbnailURL}
                alt={`${name} thumbnail`}
                onLoad={() => {
                  handleImageLoaded();
                }}
              />
              <div className='block-article__thumbnail-image skeleton-image' />
            </section>
            <section className='block-article__info'>
              <div className='block-article__name'>
                {name} <br />
                {website && (
                  <a className='block-article__link' href={website} target='_blank'>
                    {website.replace('https://', '')}
                  </a>
                )}
              </div>
              <div className='block-article__content'>
                {contentArray.map((paragraph: string, index: number) => {
                  return (
                    <span key={index}>
                      {paragraph}
                      <br />
                      <br />
                    </span>
                  );
                })}

                {github && (
                  <a className='block-article__github' href={github} target='_blank'>
                    {`${location.pathname.includes('/ru') === true ? 'ссылка на репо' : 'github repo'}`}
                  </a>
                )}
              </div>
              <div className='block-article__footer'>
                <div className='block-article__category'>
                  <span
                    className='block-article__category-span underlined'
                    onClick={navigateToBlockCategory}
                  >
                    {`${location.pathname.includes('/ru') === true ? 'категория' : 'category'}`}:{' '}
                    {category} |
                  </span>
                </div>
                <div className='block-article__date'>
                  <br />
                  {`${location.pathname.includes('/ru') === true ? 'когда' : 'when'}`}:{' '}
                  {displayedDate.toLowerCase()}
                </div>
              </div>
            </section>
          </article>
        </>
      );
    }
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
              <span className='block-article__link skeleton-box' style={{ width: '30%' }}>
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
