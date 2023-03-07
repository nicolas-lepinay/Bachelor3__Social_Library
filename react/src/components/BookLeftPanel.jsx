// ⚛️ REACT
import { Link } from 'react-router-dom';

// 🅱️ BOOTSTRAP

import OffCanvas, { OffCanvasBody } from './bootstrap/OffCanvas'

import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTabItem,
	CardTitle,
} from './bootstrap/Card';

const BookLeftPanel = ({ book }) => {

    // ⚙️ Strapi's API ROUTES :
    const API_URL = process.env.REACT_APP_API_URL;
    
	return (
        <OffCanvas isRightPanel isOpen={true}>
			<OffCanvasBody className='p-4'>
                Right Panel
			</OffCanvasBody>
		</OffCanvas>
	);
};

export default BookLeftPanel;
