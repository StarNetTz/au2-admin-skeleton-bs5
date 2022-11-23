import { IEventAggregator } from "@aurelia/kernel";
import { IRouter, route } from '@aurelia/router-lite';
import { LoginPage } from '../login-page/login-page';
import { App } from '../app/app';
import { MissingPage } from '../app/missing-page/missing-page';
import { IAuthService, SS_AUTH_CHANNEL_SIGNED_IN, SS_AUTH_CHANNEL_SIGNED_OUT } from '@starnetbih/au2-servicestack-auth';
import { IDisposable } from "aurelia";

@route({
	routes: [
		{
			path: ['', 'login'],
			component: LoginPage,
			title: 'Sign in'
		},
		{
			path: ['app'],
			component: App,
			title: 'Home'

		},
		{
			path: ['missing'],
			component: MissingPage,
			title: 'Oops'
		}
	]
})

export class Shell {

	loginSubscription: IDisposable;
	logoutSubscription: IDisposable;

	constructor(
		@IAuthService private Auth: IAuthService,
		@IEventAggregator private EA: IEventAggregator,
		@IRouter private Router: IRouter
	) {

		this.loginSubscription = this.EA.subscribe(SS_AUTH_CHANNEL_SIGNED_IN, (msg, chnl) => {
			this.Router.load('app');
		});

		this.logoutSubscription = this.EA.subscribe(SS_AUTH_CHANNEL_SIGNED_OUT, () => {
			this.Router.load('login');
		});
	}

	dispose() {
		this.loginSubscription.dispose();
		this.logoutSubscription.dispose();
	}
}