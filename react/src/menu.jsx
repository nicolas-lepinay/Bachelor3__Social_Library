export const summaryPageTopMenu = {
	intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: '#bootstrap',
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: '#storybook',
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: '#formik',
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: '#apex',
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
	},
};

export const demoPagesMenu = {
	auth: {
		id: 'auth',
		text: 'Auth Pages',
		icon: 'Extension',
	},
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth-pages/login',
		icon: 'Login',
	},
	signUp: {
		id: 'signUp',
		text: 'Sign Up',
		path: 'auth-pages/sign-up',
		icon: 'PersonAdd',
	},

	page404: {
		id: 'Page404',
		text: '404 Page',
		path: 'auth-pages/404',
		icon: 'ReportGmailerrorred',
	},
};

export const pageLayoutTypesPagesMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: 'Page Layout Types',
	},
	blank: {
		id: 'blank',
		text: 'Blank',
		path: 'page-layouts/blank',
		icon: 'check_box_outline_blank ',
	},
	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: 'page-layouts/header-and-subheader',
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: 'page-layouts/only-header',
				icon: 'ViewStream',
			},
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: 'page-layouts/only-subheader',
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: 'page-layouts/only-content',
				icon: 'WebAsset',
			},
		},
	},
	asideTypes: {
		id: 'asideTypes',
		text: 'Aside Types',
		path: 'aside-types',
		icon: 'Vertical Split',
		subMenu: {
			defaultAside: {
				id: 'defaultAside',
				text: 'Default Aside',
				path: 'aside-types/default-aside',
				icon: 'ViewQuilt',
			},
			minimizeAside: {
				id: 'minimizeAside',
				text: 'Minimize Aside',
				path: 'aside-types/minimize-aside',
				icon: 'View Compact',
			},
		},
	},
};

export const menu1 = {
    home: {
		id: 'accueil',
		text: 'Accueil',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
	},
}

export const menu2 = {
    explore: {
		id: 'explore',
		text: 'Explorer',
		path: '/explore',
		icon: 'Dashboard',
		subMenu: null,
	},
	genres: {
		id: 'genres',
		text: 'Genres',
		path: 'genres',
		icon: 'BackupTable',
		subMenu: {
            classics: {
				id: 'classique',
				text: 'Classique',
				path: 'genres/classique',
				icon: 'ViewAgenda',
			},
			fantasy: {
				id: 'fantasy',
				text: 'Fantastique',
				path: 'genres/fantastique',
				icon: 'ViewAgenda',
			},
            history: {
				id: 'histoire',
				text: 'Histoire',
				path: 'genres/histoire',
				icon: 'ViewAgenda',
			},
            childrens: {
				id: 'jeunesse',
				text: 'Jeunesse',
				path: 'genres/jeunesse',
				icon: 'ViewAgenda',
			},
			romance: {
				id: 'romance',
				text: 'Romance',
				path: 'genres/romance',
				icon: 'ViewStream',
			},
            scienceFiction: {
				id: 'sci-fi',
				text: 'Science-Fiction',
				path: 'genres/science-fiction',
				icon: 'ViewStream',
			},
		},
	},
    myBooks: {
		id: 'my-books',
		text: 'Mes livres',
		path: '/mes-livres',
		icon: 'Dashboard',
		subMenu: null,
	},
}

export const menu3 = {
    events: {
		id: 'events',
		text: 'Évènements',
		path: '/events',
		icon: 'Dashboard',
		subMenu: null,
	},
	community: {
		id: 'community',
		text: 'Communauté',
		path: 'community',
		icon: 'BackupTable',
		subMenu: {
            messenger: {
				id: 'messenger',
				text: 'Messagerie',
				path: 'community/messenger',
				icon: 'ViewAgenda',
			},
            myFriends: {
				id: 'my-friends',
				text: 'Mes amis',
				path: 'community/friends',
				icon: 'ViewAgenda',
			},
            myGroups: {
				id: 'my-groups',
				text: 'Mes groupes',
				path: 'community/groups',
				icon: 'ViewAgenda',
			},
            planning: {
				id: 'planning',
				text: 'Mon planning',
				path: 'community/planning',
				icon: 'ViewAgenda',
			},
		},
	},
}

export const queryPages = {
    book: {
        id: 'book-page',
        text: 'Livre',
        path: '/livre',
    },
}