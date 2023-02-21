import React  from 'react';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';

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

// 🛠️ Hooks :
import useFetchUsers from '../../../hooks/useFetchUsers';

const Home = () => {

	return (
		<PageWrapper
            title='Accueil' isProtected={true} >
			<SubHeader>
				<SubHeaderLeft>
					<Popovers
						title='DashboardPage.jsx'
						desc={<code>src/pages/presentation/home/Home.jsx</code>}>
						SubHeaderLeft
					</Popovers>
					<code>DashboardPage.tsx</code>
					<SubheaderSeparator />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						title='DashboardPage.jsx'
						desc={<code>src/pages/presentation/home/Home.jsx</code>}>
						SubHeaderRight
					</Popovers>
					<code>Home.jsx</code>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row d-flex justify-content-center'>
					<div className='col-12 mb-3'>
                        <Card className='px-4 py-3'>
                            <CardHeader>
                                <CardLabel icon='AutoAwesome' iconColor='warning'>
                                    <CardTitle>Hello World</CardTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <p className='new-line'>
                                    Test
                                </p>
                            </CardBody>
                        </Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Home;
