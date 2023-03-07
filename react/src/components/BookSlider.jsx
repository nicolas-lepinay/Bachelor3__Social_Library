// ⚛️ REACT
import { Link } from 'react-router-dom';

// 🖼️ SLIDER
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 📜 MENU :
import { queryPages } from '../menu';

const BookSlider = ({ books }) => {

    // Slider settings :
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
    };

    // ⚙️ Strapi's API ROUTES :
    const API_URL = process.env.REACT_APP_API_URL;
    
	return (
        <Slider {...settings} className='book-slider'>
            {books.map((book) => (
                <Link
                    to={`${queryPages.book.path}/${book.id}`}
                >
                    <div className='book-slider__container'>
                        <img src={`${API_URL}${book.attributes.image.data.attributes.url}`} className='book-cover shadow-md' />
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
	);
};

export default BookSlider;
