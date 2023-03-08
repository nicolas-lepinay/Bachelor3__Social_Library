// ⚛️ REACT
import { useEffect, useState } from 'react';

import { useParams, Link, Navigate } from 'react-router-dom';

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

import Icon from '../../../components/icon/Icon';

// OTHER COMPONENTS
import BookLeftPanel from '../../../components/BookLeftPanel';

// 🛠️ HOOKS :
import useFetchBooks from '../../../hooks/useFetchBooks';

// 📜 MENU PATH :
import { menu2, queryPages } from '../../../menu';

// ⏰ MOMENT.JS
import moment from 'moment';
import 'moment/locale/fr';

const Book = () => {

    moment.locale('fr');

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

    // Average rating :
    const [rating, setRating] = useState(0);
    const [stars, setStars] = useState([]);

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

    // Calcul de la note générale :
    useEffect(() => {
        const calculateRating = () => {
            let average = 0;
            const comments = book?.attributes?.comments?.data;
            
            if(comments.length > 0) {
                comments.forEach((comment) => {
                    if(Number.isInteger(comment.attributes.rating)) 
                        average += comment.attributes.rating
                    }
                )
                average = (average / comments.length).toFixed(1);
            } else {
                average = -1;
            }
            setRating(average);

            const fullStars = Math.floor(average); // average == 3.5  => fullStars = 3

            // Create an empty array. We will add 1s, 0s, and a decimal value for the partial star.
            const starArr = [];

            // This adds a 1 to the array for each full star in our rating :
            for(let i = 1; i <= fullStars; i++) {
                starArr.push(1); // [1, 1, 1]
            }

            // Wrapped in an if block because the following only needs to occur if it's not a full 5.
            if(average < 5) {
                // Calculates the partial star. For example 3.5 - 3 = 0.5. 0.5 will get added to the array in the next line to represent the partial star
                const partialStar = average - fullStars;

                starArr.push(partialStar); // [1, 1, 1, 0.5]

                // Calculates the number of empty stars
                const emptyStars = 5 - starArr.length;

                // This for loop adds 0s to the array to represent empty stars
                for(let i = 1; i <= emptyStars; i++) {
                    starArr.push(0);
                }
            }
            setStars(starArr);
        }
        book.id && calculateRating();
    }, [id, book]);

	return (
		<PageWrapper
            title={`Book ID ${id}`} isProtected={true} >
			<Page>
				<div className='row h-100'>
                    <div className='col-xl-3 col-lg-4'>
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

                    <div className='col-xl-9 col-lg-8'>
                        <Card stretch className='transparent'>
                            <CardBody isScrollable>
                                <div className='row g-4'>
                                    <div className='col-12'>
                                        {/* TITRE & AUTEUR */}
                                        <h1 className='font-playfair line-height-50'>{book?.attributes?.title}</h1>
                                        <h4 className='fw-300 line-height-50'>{book?.attributes?.author?.data?.attributes?.first_name} {book?.attributes?.author?.data?.attributes?.last_name}</h4>
                                        
                                        {/* NOTATION*/}
                                        <div className='d-flex align-items-baseline' style={{flexWrap: 'wrap'}}>
                                            <div className='pr-3'>
                                                {stars.map((value, i) => (
                                                    <Icon
                                                        key={`star-${i}`}
                                                        icon={value == 1 ? 'StarFull' : value == 0 ? 'StarEmpty' : 'StarHalf'}
                                                        size='3x'
                                                        color='danger'
                                                    />
                                                ))}
                                            </div>

                                            {rating >= 0 &&
                                            <div className='align-self-center pr-3 font-crimson'>
                                                <h1 className='fw-900'>{rating}</h1>
                                            </div>
                                            }

                                            <div className='align-self-center pt-2'>
                                                {rating >= 0 ?
                                                    <p className='text-muted'>Noté par {(book?.attributes?.comments?.data?.length)?.toLocaleString("fr-FR")} utilisateurs.</p>
                                                    :
                                                    <p className='text-muted px-4'>Soyez le premier à noter ce livre.</p>
                                                }
                                            </div>
                                        </div>
                                        
                                        {/* SYNOPSIS */}
                                        <div className='row'>
                                            <div className='col-12 col-sm-10 py-5'>
                                                <p className='fs-16 first-letter'>{book?.attributes?.description}</p>
                                            </div>
                                        </div>

                                        {/* GENRES */}
                                        <div className='d-flex'>
                                            <p className='text-muted pr-2'>Genres</p>

                                            {book?.attributes?.genres?.data?.map( (genre, i) => (
                                                <Link 
                                                to={`${menu2.genres.path}/${genre?.attributes?.path}`}
                                                    className='fw-700 px-3 text-primary'
                                                    key={`genre-${i}`}
                                                >
                                                    {genre?.attributes?.name}
                                                </Link>
                                            ))
                                            }
                                        </div>

                                        {/* DETAILS */}
                                        <div className='py-2'>
                                            {book?.attributes?.pages > 0 &&
                                                <p>{book?.attributes?.pages} pages</p>
                                            }

                                            {book?.attributes?.release_date !== '' &&
                                                <p>Publié le {moment(book?.attributes?.release_date).format('LL')}</p>
                                            }                                        
                                        </div>
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
