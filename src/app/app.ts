import { IRouter, IRouteViewModel, route } from 'aurelia';
import { IEventAggregator } from 'aurelia';
import { AboutPage } from './about-page/about-page';
import { WelcomePage } from './welcome-page/welcome-page';

@route({
	routes: [
		{
			path: ['', 'welcome'],
			component: WelcomePage,
			title: 'Welcome',
			viewport: 'app'
		},
		{
			path: 'about',
			component: AboutPage,
			title: 'About',
			viewport: 'app'
		}
	]
})
export class App implements IRouteViewModel {
	constructor(
		@IRouter private Router: IRouter,
		@IEventAggregator private EventAggregator: IEventAggregator
	) {
	}

	load(params, next, current) {
		console.log('load app')
		this.EventAggregator.publish("shell:loaded");
	}
}
