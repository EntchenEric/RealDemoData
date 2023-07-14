import './m28-demoDataCreator/page'

import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

Shopware.Module.register('m28-demoData', {
    // configuration here
	type: 'plugin',
    name: 'demoData',
    title: 'general.title',
    description: 'demoData',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',

	snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

	routes: {
        Dashboard: {
            component: 'm28-demoData-Dashboard',
            path: 'Dashboard'
        },
    },

	navigation: [{
		id: 'm28.demoData',
		label: 'general.label',
		color: '#ff3d58',
		path: 'm28.demoData.Dashboard',
		icon: 'default-device-server',
    parent: 'sw-catalogue',
		position: 0
	}]
});