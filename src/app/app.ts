import { IRouter, IRouteViewModel, route } from 'aurelia';
import { IEventAggregator } from 'aurelia';
import { MyProfile } from './my-profile/my-profile';
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
			path: 'profile',
			component: MyProfile,
			title: 'My profile',
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
		this.EventAggregator.publish("shell:loaded"); /*Subscribing navbar directly to auth:login did not work bacause of lifecycles. Should improve this*/
	}
}
