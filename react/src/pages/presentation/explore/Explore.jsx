import { Link } from 'react-router-dom';

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

// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🛠️ Hooks :
import useFetchBooks from '../../../hooks/useFetchBooks';

// Book URL path :
import { queryPages } from '../../../menu';

const Explore = () => {

    
    // ⚙️ Strapi's API ROUTES :
    const API_URL = process.env.REACT_APP_API_URL;

    // 📚 Fetch all books :
    const { data: books } = useFetchBooks();

    console.log(books)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
    };
    
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
                        <Slider {...settings} className='book-slider'>
                            {books.map((book) => (
                                <Link
                                    to={`${queryPages.book.path}/${book.id}`}
                                >
                                    <div className='book-slider__container'>
                                        <img src={`${API_URL}${book.attributes.image.data.attributes.url}`} />
                                        <h3 className='font-playfair' title={book.attributes.title}>
                                            {book.attributes.title.length < 50 ? book.attributes.title : `${book.attributes.title.slice(0, 50)}...`}
                                        </h3>
                                        <p>
                                            {book.attributes.author.data.attributes.first_name} {book.attributes.author.data.attributes.last_name}
                                        </p>
                                    </div>
                                </Link>
                            ))}

                            {books.map((book) => (
                                <div>
                                    <h3>Another book</h3>
                                </div>
                            ))}

                            {books.map((book) => (
                                <div>
                                    <h3>Yet another book</h3>
                                </div>
                            ))}
                        </Slider>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Explore;
