import { IAuthService } from '@starnetbih/au2-auth';
import { IEventAggregator } from "@aurelia/kernel";
import { IRouter, route } from '@aurelia/router';
import { LoginPage } from '../login-page/login-page';
import { App } from '../app/app';
import { IDisposable } from 'aurelia';

@route({
	routes: [
		{
			path: ['', 'login'],
			component: LoginPage,
			title: 'Sign in'
		},
		{
			path: ['welcome'],
			component: App,
			title: 'Home'

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

		this.loginSubscription = this.EA.subscribe("auth:login", (msg, chnl) => {
			this.Router.load('welcome');
		});

		this.logoutSubscription = this.EA.subscribe("auth:logout", () => {
			this.Router.load('login');
		});
	}

	dispose() {
		this.loginSubscription.dispose();
		this.logoutSubscription.dispose();
	}
}