// ⚛️ REACT
import { useEffect, useState, useLayoutEffect } from 'react';

import { useParams, Link, Navigate } from 'react-router-dom';

// 🅱️ BOOTSTRAP
import Alert from '../../../components/bootstrap/Alert';
import Button from '../../../components/bootstrap/Button';

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

import OffCanvas, { 
    OffCanvasHeader, 
    OffCanvasTitle, 
    OffCanvasBody 
} from '../../../components/bootstrap/OffCanvas';

import Avatar from '../../../components/Avatar';

import Select from '../../../components/bootstrap/forms/Select'
import Option from '../../../components/bootstrap/Option';

import Icon from '../../../components/icon/Icon';

// OTHER COMPONENTS
import BookLeftPanel from '../../../components/BookLeftPanel';
import DefaultCover from '../../../assets/img/book-default-cover.jpg';

// 🛠️ HOOKS :
import useAuth from '../../../hooks/useAuth';
import useFetchBooks from '../../../hooks/useFetchBooks';
import useFetchBorrowedBooks from '../../../hooks/useFetchBorrowedBooks';

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

    // Today :
    const [today, setToday] = useState();

    // Récupérer le livre par son ID :
      const { 
        data: book, 
        loading: loadingBook,
        error,
        setData: setBook, 
    } = useFetchBooks({ filters: `&filters[id]=${id}`, isUnique: true });

    // Récupérer les emprunts faits pour ce livre :
    const { 
        data: borrowing, 
        setData: setBorrowing, 
    } = useFetchBorrowedBooks({ filters: `&filters[book][id]=${book?.id}&filters[endsAt][$gt]=${today?.toISOString()}` });

    // 🦸 Utilisateur connecté :
    const user = useAuth()?.user;

    // Ouvrir le panneau latéral pour emprunter le livre :
    const [openPanel, setOpenPanel] = useState(false);

    // Note moyenne du livre :
    const [rating, setRating] = useState(0);
    const [stars, setStars] = useState([]);

    // Liste des options d'emprunt :
    const BORROWING_OPTIONS = [
        {
            text: '12 heures',
            value: 12,
        },
        {
            text: '24 heures',
            value: 24,
        },
        {
            text: '48 heures',
            value: 48,
        },
    ]

    // LOG
    console.log(borrowing);

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

    // Récupération de la date du jour :
    useLayoutEffect( () => {
        setToday(new Date());
    }, [id, book])

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
                                        {book?.attributes?.image?.data?.attributes?.url ?
                                            <img src={`${API_URL}${book?.attributes?.image?.data?.attributes?.url}`} className='book-cover shadow-md' />  
                                            :
                                            <img src={DefaultCover} className='book-cover shadow-md' />  
                                        }       
                                    </div>
                                </div>

                                {/* SI L'UTILISATEUR A EMPRUNTÉ LE LIVRE... */}
                                {borrowing.some(borrow => borrow?.attributes?.user?.data?.id === user?.id) ?
                                    <h6 className='width-225 text-center text-muted'>
                                        Vous avez emprunté ce livre {moment((borrowing.find(b => b?.attributes?.user?.data?.id === user?.id))?.attributes?.createdAt).calendar()}
                                    </h6>
                                    :
                                    <h6 className='width-225 text-center text-muted'>
                                        {book?.attributes?.stock - borrowing.length} sur {book?.attributes?.stock} disponibles
                                    </h6>
                                }

                                {/* SI L'UTILISATEUR A EMPRUNTÉ LE LIVRE... */}
                                {borrowing.some(borrow => borrow?.attributes?.user?.data?.id === user?.id) ?    
                                    <Button
                                        color='success'
                                        className='width-225 mt-4'
                                        size='lg'
                                        icon='MenuBook'
                                    >Lire</Button> 
                                    : book?.attributes?.stock > borrowing.length ?
                                    <Button
                                        color='info'
                                        className='width-225 mt-4'
                                        size='lg'
                                        icon='BookmarkAdded'
                                        onClick={() => setOpenPanel(true)}
                                    >Emprunter</Button> 
                                    :
                                    <Button
                                        color='danger'
                                        className='width-225 mt-4'
                                        size='lg'
                                        icon='ErrorOutline'
                                    >Indisponible</Button> 
                                }

                                <Button
                                    color='info'
                                    className='width-225 mt-4 pt-3 pb-3'
                                    isLink
                                    isActive
                                    icon='ShoppingCart'
                                >Acheter sur Amazon</Button> 
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

                {/* EMPRUNTER LE LIVRE */}
                <OffCanvas
                    isBackdrop
                    isBodyScroll 
                    isOpen={openPanel}
                    setOpen={setOpenPanel}
                    > 
                    <OffCanvasHeader 
                        setOpen={setOpenPanel}
                        >
                        <OffCanvasTitle id='borrow-panel' className='px-4'>Emprunter un livre</OffCanvasTitle>
                    </OffCanvasHeader>
                    <OffCanvasBody>
                        <div className='d-flex justify-content-center my-4'>
                            <Avatar
                                src={book?.attributes?.image?.data?.attributes?.url ? `${API_URL}${book?.attributes?.image?.data?.attributes?.url}` : DefaultCover}
                                className='cover'
                                shadow='default'
                            />
                        </div>

                        <div className='d-flex flex-column align-items-center my-5'>
                            <h4 className='fw-bold text-center'>{book?.attributes?.title}</h4>
                            <h5 className='text-muted mb-4'>{book?.attributes?.author?.data?.attributes?.first_name} {book?.attributes?.author?.data?.attributes?.last_name}</h5>

                                <div className='pb-2'>
                                    {stars.map((value, i) => (
                                        <Icon
                                            key={`panel-star-${i}`}
                                            icon={value == 1 ? 'StarFull' : value == 0 ? 'StarEmpty' : 'StarHalf'}
                                            size='2x'
                                            color='danger'
                                        />
                                    ))}
                                </div>
                                {rating >= 0 &&
                                    <div className='align-self-center'>
                                        <h6 className=''>{rating} sur 5</h6>
                                    </div>
                                }

                            <p className='text-muted justified px-4 py-3'>{book?.attributes?.description.length < 540 ? book?.attributes?.description : `${book?.attributes?.description.slice(0, 540)} ...`}</p>
                        </div>

                        <div className='px-4'>
                            <h5 className='pl-1 pb-2'>Durée de l'emprunt</h5>
                            <Select
                                placeholder='Veuillez choisir une durée...'
                                size='lg'
                            >
                                {BORROWING_OPTIONS.map( option => (
                                    <Option
                                        key={option.text}
                                        value={option.value}
                                        disabled={option.value > 12}
                                    >
                                        {option.text}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                    </OffCanvasBody>
                </OffCanvas>

			</Page>
		</PageWrapper>
	);
};

export default Book;
