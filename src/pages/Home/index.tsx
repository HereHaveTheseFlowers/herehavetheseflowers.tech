import { useParams } from 'react-router-dom';
import { Button, Navbar, BlockGrid } from '../../components';

export default function Home() {
    let { category } = useParams();
    let { subcategory } = useParams();
    if(category) category = category.replaceAll("-", " ");
    if(subcategory) category = category.replaceAll("-", " ");

    const selectedLang = category === "ru" ? "ru" : "en"

    if(selectedLang === "ru") {
        category = subcategory;
    }
    return (
        <>
            <Navbar category={category} lang={selectedLang} />
            <BlockGrid category={category} lang={selectedLang} />
        </>
    )
}
