import { useLayoutEffect, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { ISubHeaderProps } from '../SubHeader/SubHeader';
// import { IPageProps } from '../Page/Page';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../menu';

// 🛠️ useAuth hook :
import useAuth from '../../hooks/useAuth';

const PageWrapper = forwardRef(
	({ isProtected, title, description, className, children }, ref) => {

        // 🦸 Logged-in user :
        const auth = useAuth(); 
        const navigate = useNavigate();

		useLayoutEffect(() => {
			// @ts-ignore
			document.getElementsByTagName('TITLE')[0].text = `${title ? `${title} | ` : ''}${
				process.env.REACT_APP_SITE_NAME
			}`;
			// @ts-ignore
			document
				?.querySelector('meta[name="description"]')
				.setAttribute('content', description || process.env.REACT_APP_META_DESC || '');
		});

		useEffect(() => {
			if (isProtected && !auth?.user) {
				navigate(`/${demoPagesMenu.login.path}`);
			}
			return () => {};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
				{children}
			</div>
		);
	},
);
PageWrapper.displayName = 'PageWrapper';
PageWrapper.propTypes = {
	isProtected: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
PageWrapper.defaultProps = {
	isProtected: false,
	title: undefined,
	description: undefined,
	className: undefined,
};

export default PageWrapper;
