import { useParams } from 'react-router-dom';
import { Button, Navbar, BlockGrid } from '../../components';

export default function Home() {
    let { category } = useParams();
    if(category) category = category.replaceAll("-", " ");
    console.log(category)
    return (
        <>
            <Navbar category={category} />
            <BlockGrid category={category} />
        </>
    )
}
