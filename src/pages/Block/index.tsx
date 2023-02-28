import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Navbar } from '../../components';
import firestoreController from '../../controllers/firestoreController';
import { translateCategory } from '../Home';

export default function Block() {
    const location = useLocation();
    let { blockId } = useParams();
    let { category } = useParams();

    const selectedLang = location.pathname.includes("/ru") === true ? "ru" : "en"
    useEffect(()=>{
        firestoreController.updateBlocks(selectedLang)
    }, []);
    if(selectedLang === "ru") {
        category = translateCategory(category)
    }
    return (
        <>
            <Navbar category={category} lang={selectedLang} />
            {blockId}
        </>
    )
}
