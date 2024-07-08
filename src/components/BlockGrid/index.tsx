import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import React from 'react';
import store from '../../utils/Store';
import { RouterList } from '../../router/routerList';
import firestoreController from '../../controllers/firestoreController'
import { translateCategory } from '../../pages/Home';
import { dateOptions } from '../../constants/dateOptions';

type BlockGridProps = {
    lang: string;
    category?: string;
}

export function BlockGrid(props: BlockGridProps) {
    const globalCategory = props.category;
    const [blocksList, setBlocksList] = useState(store.getState().blocks);
    useEffect(()=>{
        (async function(){
            const updateBlocks = () => { 
                setBlocksList(store.getState().blocks)
             }
            store.on("blocks", updateBlocks)
        })();
    }, []);
    let blocksPinned: any[] = [];
    let blocksListSorted = blocksList.sort((blockA: BlockProps, blockB: BlockProps)=>{
        if(blockB.date?.seconds && blockA.date?.seconds)
        return blockB.date.seconds - blockA.date.seconds
        else 
        return blockB
    })
    blocksListSorted = blocksListSorted.filter((block: BlockProps) => { 
        if(block.pinned) {
            blocksPinned.push(block);
            return false;
        }
        return true
    });
    return (
        <div className="blockgrid">
            {blocksPinned.map((block, i)=> {
                if(!globalCategory || block.category === globalCategory || block.name === "loading") {
                return <BlockGrid.Block 
                            key={i}
                            category={block.category}
                            date={block.date}
                            name={block.name}
                            thumbnailURL={block.thumbnailURL}
                            description={block.description}
                            content={block.content}
                            pinned={block.pinned}
                            id={block.id}
                        />
                }
            })}
            {blocksListSorted.map((block: BlockProps, i: number)=> {
                if(!globalCategory || block.category === globalCategory) {
                return <BlockGrid.Block 
                            key={i}
                            category={block.category}
                            date={block.date}
                            name={block.name}
                            thumbnailURL={block.thumbnailURL}
                            description={block.description}
                            content={block.content}
                            pinned={block.pinned}
                            id={block.id}
                        />
                }
            })}
        </div>
    )
};

export type BlockProps = {
    category: string;
    date: { seconds: number; nanoseconds: number; };
    name: string;
    thumbnailURL: string;
    description: string;
    content: string;
    pinned: boolean;
    id: string;
    website: string;
};

export type BlockPreviewProps = {
    category: string;
    date: { seconds: number; nanoseconds: number; };
    name: string;
    thumbnailURL: string;
    description: string;
    content: string;
    pinned: boolean;
    id: string;
};

BlockGrid.Block = function Block(props: BlockPreviewProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { category, date, name, thumbnailURL, description, pinned } = props;
    let isHot = false;
    let displayedDate = "---";
    const [imageLoading, setImageLoading] = useState(true);
    const handleImageLoaded = () => {
        setImageLoading(false);
    };

    if(date) {
        const blockDate = new Date(date.seconds * 1000);
        const localeLang = location.pathname.includes("/ru") === true ? "ru" : "en-US";
        displayedDate = blockDate.toLocaleString(localeLang, dateOptions).replace(".", "").toLowerCase();
        const currentYear = new Date().getFullYear();
        if(blockDate.getFullYear() !== currentYear) {
            displayedDate += ` ${blockDate.getFullYear()}`
        }
        if(date.seconds * 1000 > Date.now() - 604800000) {
            isHot = true;
        }
    }

    const navigateToBlockPage = () => {
        navigate(`${location.pathname.includes("/ru") ? "/ru" : ""}/${translateCategory(props.category, "en").replaceAll(" ", "-")}/block/${props.id}`)
    }
    const navigateToBlockCategory = () => {
        navigate(`${location.pathname.includes("/ru") ? "/ru" : ""}/${translateCategory(props.category, "en").replaceAll(" ", "-")}`)
    }
    if(!name || name === 'loading') {
        return (
            <div className="block">
                <div className="block__status">
                    <div className="block__category">
                        <span className="block__category-span skeleton-box" style={{width: '30px'}}>{'\xa0'}</span>
                    </div>
                    <div className="block__date skeleton-box" style={{width: '35%', height: '100%'}} ></div>
                </div>
                <div className="block__thumbnail">
                    <img className="block__thumbnail-image image_state_unloaded" src={thumbnailURL} alt={`${name} thumbnail`} onLoad={() => {
                            handleImageLoaded();
                        }} />
                    <div className=" block__thumbnail-image skeleton-image"/>
                <div className="block__overlay" />
                </div>
                <span className="block__name skeleton-box"  style={{width: '30%'}}>
                    {'\xa0'}
                </span>
                <span className="block__description skeleton-box">
                    {'\xa0'}
                </span>
                <span className="block__description skeleton-box">
                    {'\xa0'}
                </span>
                <span className="block__description skeleton-box">
                    {'\xa0'}
                </span>
            </div>
        )
    } else if(name && imageLoading) {
        return (
            <div className="block block_state_loaded">
                <div className="block__status">
                    <a className="block__category">
                        <span className="block__category-span" onClick={navigateToBlockCategory}>{ category }</span>
                    </a>
                    { pinned && <svg className="block__pinned" viewBox="0 0 800 799.83">
                                    <path d="M793.18 192.28c19.95-20-5.35-77.75-56.6-129-50.65-50.64-107.48-75.82-128.14-57.1l-.4-.39-283.91 
                                        255c-52.5-45.76-131.87-44.2-181.87 5.77a44.91 44.91 0 0 0 0 63.52l128.8 128.8L6.38 757.63a25.37 25.37 
                                        0 0 0 35.84 35.78l298.39-264.98 12.81 12.8 66.36 66.35 49.58 49.57a44.88 44.88 0 0 0 63.48-.03c49.95-49.97 
                                        51.52-129.37 5.79-181.85l253.65-282.46c.26-.23.67-.28.9-.54Z"/>
                                </svg> }
                    { isHot && <><svg className="block__notification" viewBox="0 0 70.7 70.7">
                                    <path d="M28.3,63.2h14c0,0.9-0.2,1.9-0.5,2.7c-0.9,2.1-2.8,3.7-5,4.1c-0.5,0.1-0.9,0.1-1.4,0.1
                                        C31.5,70.2,28.3,67.1,28.3,63.2z M9.8,60.2c-1.4,0-2.5-1.1-2.5-2.5c0-0.7,0.3-1.3,0.7-1.8l4.3-4.3c1.3-1.3,2-3,2-4.9V32.2
                                        c0-10.8,5.7-21.7,15.8-24.1V5.8c0-2.9,2.3-5.3,5.2-5.3c0.1,0,0.2,0,0.4,0c2.8,0.2,4.9,2.6,4.9,5.4v2.2c10,2.4,15.8,13.3,15.8,24.1
                                        v14.7c0,1.8,0.7,3.6,2,4.9l4.3,4.3c1,1,1,2.5,0,3.5c-0.5,0.5-1.1,0.7-1.8,0.7L9.8,60.2z"/>
                                </svg><span className="block__notification-text">NEW!</span></> }
                    <span className="block__date" >{displayedDate}</span>
                </div>
                <div className="block__thumbnail" onClick={navigateToBlockPage}>
                    <img className="block__thumbnail-image image_state_unloaded" src={thumbnailURL} alt={`${name} thumbnail`} onLoad={() => {
                            handleImageLoaded();
                        }} />
                    <div className=" block__thumbnail-image skeleton-image"/>
                <div className="block__overlay" />
                </div>
                <span className="block__name underlined" onClick={navigateToBlockPage}>
                    { name }
                </span>
                <span className="block__description">
                    { description }
                </span>
                <div className="block__overlay" onClick={navigateToBlockPage}></div>
            </div>
        )
    } else {
        return (
            <div className="block block_state_loaded" >
                <div className="block__overlay" onClick={navigateToBlockPage}></div>
                <div className="block__status">
                    <a className="block__category" onClick={navigateToBlockCategory}>
                        <span className="block__category-span">{ category }</span>
                    </a>
                    { pinned && <svg className="block__pinned" viewBox="0 0 800 799.83">
                                    <path d="M793.18 192.28c19.95-20-5.35-77.75-56.6-129-50.65-50.64-107.48-75.82-128.14-57.1l-.4-.39-283.91 
                                        255c-52.5-45.76-131.87-44.2-181.87 5.77a44.91 44.91 0 0 0 0 63.52l128.8 128.8L6.38 757.63a25.37 25.37 
                                        0 0 0 35.84 35.78l298.39-264.98 12.81 12.8 66.36 66.35 49.58 49.57a44.88 44.88 0 0 0 63.48-.03c49.95-49.97 
                                        51.52-129.37 5.79-181.85l253.65-282.46c.26-.23.67-.28.9-.54Z"/>
                                </svg> }
                    { isHot && <><svg className="block__notification" viewBox="0 0 70.7 70.7" onClick={navigateToBlockPage}>
                                    <path d="M28.3,63.2h14c0,0.9-0.2,1.9-0.5,2.7c-0.9,2.1-2.8,3.7-5,4.1c-0.5,0.1-0.9,0.1-1.4,0.1
                                        C31.5,70.2,28.3,67.1,28.3,63.2z M9.8,60.2c-1.4,0-2.5-1.1-2.5-2.5c0-0.7,0.3-1.3,0.7-1.8l4.3-4.3c1.3-1.3,2-3,2-4.9V32.2
                                        c0-10.8,5.7-21.7,15.8-24.1V5.8c0-2.9,2.3-5.3,5.2-5.3c0.1,0,0.2,0,0.4,0c2.8,0.2,4.9,2.6,4.9,5.4v2.2c10,2.4,15.8,13.3,15.8,24.1
                                        v14.7c0,1.8,0.7,3.6,2,4.9l4.3,4.3c1,1,1,2.5,0,3.5c-0.5,0.5-1.1,0.7-1.8,0.7L9.8,60.2z"/>
                                </svg><span className="block__notification-text" onClick={navigateToBlockPage}>NEW!</span></> }
                    <span className="block__date" onClick={navigateToBlockPage}>{displayedDate}</span>
                </div>
                <div className="block__thumbnail" onClick={navigateToBlockPage}>
                    <img className="block__thumbnail-image image_state_loaded" src={thumbnailURL} alt={`${name} thumbnail`} />
                </div>
                <span className="block__name underlined" onClick={navigateToBlockPage}>
                    { name }
                </span>
                <span className="block__description" >
                    { description }
                </span>
            </div>
        )
    }
};
