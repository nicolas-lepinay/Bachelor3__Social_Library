// ⚛️ REACT
import { Link } from 'react-router-dom';

// 🅱️ BOOTSTRAP
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';

import Search from '../../../components/Search';

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

import Carousel from '../../../components/bootstrap/Carousel';
import CarouselSlide from '../../../components/bootstrap/CarouselSlide';
import CarouselCaption from '../../../components/bootstrap/CarouselCaption';

import Alert from '../../../components/bootstrap/Alert';
import Spinner from '../../../components/bootstrap/Spinner';

// 🖼️ SLIDER
import BookSlider from '../../../components/BookSlider';

// 🛠️ HOOKS :
import useFetchBooks from '../../../hooks/useFetchBooks';

// 📜 MENU :
                import { menu1, queryPages } from '../../../menu';

const Explore = () => {

    // ⚙️ Strapi's API ROUTES :
    const API_URL = process.env.REACT_APP_API_URL;

    // 📚 Fetch all books :
    const { 
        data: books,
        loading: loadingBooks,
        error, 
    } = useFetchBooks();

    console.log(books)

    // Slider settings :
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
    };

    // Chargement :
    // if(loadingBooks)
    // return (
    //     <PageWrapper title='Chargement...'>
    //         <div className='position-absolute top-50 start-50 translate-middle'>
    //             <Spinner size={62} color="info" />
    //         </div>
    //     </PageWrapper>
    // );

    // Erreur :
    if(error)
        return (
            <PageWrapper title="Une erreur s'est produite">
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <Alert icon='Report' isLight color="danger" className='new-line'>
                        {`Nous n'avons pas pu charger les livres\n(${error}).`}
                    </Alert>
                </div>
            </PageWrapper>
        );

    // Si aucun utilisateur :
    if(!books)
        return <Navigate to={`/${menu1.home.path}`}/>
    
	return (
		<PageWrapper
            title='Explorer' isProtected={true} >
			<SubHeader>
				<SubHeaderLeft>
					{/* <Popovers
						title='DashboardPage.jsx'
						desc={<code>src/pages/presentation/home/Home.jsx</code>}>
						SubHeaderLeft
					</Popovers>
					<code>DashboardPage.tsx</code>
					<SubheaderSeparator /> */}
                    <Search />
				</SubHeaderLeft>

				{/* <SubHeaderRight>
					<Popovers
						title='DashboardPage.jsx'
						desc={<code>src/pages/presentation/home/Home.jsx</code>}>
						SubHeaderRight
					</Popovers>
					<code>Home.jsx</code>
				</SubHeaderRight> */}

			</SubHeader>
			<Page container='fluid'>
				<div className='row d-flex justify-content-center'>
					<div className='col-9 mb-3'>
                        <BookSlider books={books} />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Explore;
