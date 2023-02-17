import { useParams } from 'react-router-dom';
import { Button, Navbar } from '../../components';

export default function Category() {
    let { category } = useParams();
    category = category.replaceAll("-", " ");
    return (
        <>
            <Navbar category={category} />
        </>
    )
}
