// ⚛️ REACT
import { useParams, Navigate } from 'react-router-dom';

// 🅱️ BOOTSTRAP
import Alert from '../../../components/bootstrap/Alert';
import Spinner from '../../../components/bootstrap/Spinner';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';

import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTabItem,
	CardTitle,
} from '../../../components/bootstrap/Card';

// OTHER COMPONENTS
import BookLeftPanel from '../../../components/BookLeftPanel';

// 🛠️ HOOKS :
import useFetchBooks from '../../../hooks/useFetchBooks';

// 📜 MENU PATH :
import { menu2 } from '../../../menu';

const Book = () => {

    // ⚙️ Strapi's API ROUTES :
    const API_URL = process.env.REACT_APP_API_URL;

    // 📔 Book's ID :
    const { id } = useParams();

    // Fetch book by ID :
      const { 
        data: book, 
        loading: loadingBook,
        error,
        setData: setBook, 
    } = useFetchBooks({ filters: `&filters[id]=${id}`, isUnique: true });

    // Erreur :
    if(error)
        return (
            <PageWrapper title="Une erreur s'est produite">
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <Alert icon='Report' isLight color="danger" className='new-line'>
                        {`Nous n'avons pas pu charger les données du livre\n(${error}).`}
                    </Alert>
                </div>
            </PageWrapper>
        );

    // Si aucun livre :
    if(!book)
        return <Navigate to='/'/>

	return (
		<PageWrapper
            title={`Book ID ${id}`} isProtected={true} >
			<Page>
				<div className='row h-100'>
                    <div className='col-xl-3 col-lg-4 col-md-6'>
                        <Card stretch className='transparent'>
                            <CardBody isScrollable>
                                <div className='row g-3'>
                                    <div className='col-12'>
                                        <img 
                                            src={`${API_URL}${book?.attributes?.image?.data?.attributes?.url}`} 
                                            className='book-cover shadow-md'
                                        />          
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className='col-xl-9 col-lg-8 col-md-6'>
                        <Card stretch className='transparent'>
                            <CardBody isScrollable>
                                <div className='row g-4'>
                                    <div className='col-12'>
                                        <h1 className='font-playfair line-height-50'>{book?.attributes?.title}</h1>
                                        <h4 className='fw-300'>{book?.attributes?.author?.data?.attributes?.first_name} {book?.attributes?.author?.data?.attributes?.last_name}</h4>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
				</div>

			</Page>
		</PageWrapper>
	);
};

export default Book;
