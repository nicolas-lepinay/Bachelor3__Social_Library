import React, { lazy } from 'react';
import { dashboardPagesMenu, demoPagesMenu, pageLayoutTypesPagesMenu, menu1, menu2, menu3, queryPages } from '../menu';
import Login from '../pages/presentation/auth/Login';
import Profile from '../pages/presentation/profile/Profile';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const PAGE_LAYOUTS = {
	HEADER_SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/HeaderAndSubheader')),
	HEADER: lazy(() => import('../pages/presentation/page-layouts/OnlyHeader')),
	SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/OnlySubheader')),
	CONTENT: lazy(() => import('../pages/presentation/page-layouts/OnlyContent')),
	BLANK: lazy(() => import('../pages/presentation/page-layouts/Blank')),
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage')),
	MINIMIZE_ASIDE: lazy(() => import('../pages/presentation/aside-types/MinimizeAsidePage')),
};

const MENU_1 = {
    HOME: lazy(() => import('../pages/presentation/home/Home')),
}

const MENU_2 = {
    EXPLORE: lazy(() => import('../pages/presentation/explore/Explore')),
    GENRES: lazy(() => import('../pages/presentation/genres/Genre')),
    MY_BOOKS: lazy(() => import('../pages/presentation/my-books/MyBooks')),
}

const MENU_3 = {
    EVENTS: lazy(() => import('../pages/presentation/events/Events')),
}

const QUERY_PAGES = {
    BOOK: lazy(() => import('../pages/presentation/book/Book')),
}


const presentation = [

    // Accueil 
	{
		path: menu1.home.path,
		element: <MENU_1.HOME />,
	},

    // Explore, Genres, My Books 
	{
		path: menu2.explore.path,
		element: <MENU_2.EXPLORE />,
	},
    {
		path: menu2.genres.path,
		element: <MENU_2.GENRES />,
	},
    {
		path: menu2.myBooks.path,
		element: <MENU_2.MY_BOOKS />,
	},

    // Events, Community 
	{
		path: menu3.events.path,
		element: <MENU_3.EVENTS />,
	},

    // Profile
	{
		path: 'mon-compte',
		element: <Profile />,
	},

    // Query Pages (/:id)
	{
		path: `${queryPages.book.path}/:id`,
		element: <QUERY_PAGES.BOOK />,
	},
	// Autres
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},

	/** ************************************************** */

	/**
	 * Page Layout Types
	 */
	// {
	// 	path: pageLayoutTypesPagesMenu.blank.path,
	// 	element: <PAGE_LAYOUTS.BLANK />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path,
	// 	element: <PAGE_LAYOUTS.HEADER_SUBHEADER />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.path,
	// 	element: <PAGE_LAYOUTS.HEADER />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path,
	// 	element: <PAGE_LAYOUTS.SUBHEADER />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path,
	// 	element: <PAGE_LAYOUTS.CONTENT />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.asideTypes.subMenu.defaultAside.path,
	// 	element: <PAGE_LAYOUTS.ASIDE />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.asideTypes.subMenu.minimizeAside.path,
	// 	element: <PAGE_LAYOUTS.MINIMIZE_ASIDE />,
	// },
];

const contents = [...presentation];

export default contents;
