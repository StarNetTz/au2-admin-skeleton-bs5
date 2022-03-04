
import { IDisposable, IEventAggregator } from 'aurelia';
import { IAuthService } from '@starnetbih/au2-auth';
import { I18N } from '@aurelia/i18n';


export class Navbar {
	public userName: string;
	eventSubscription: IDisposable;

	constructor(
		@IAuthService private Auth: IAuthService,
		@IEventAggregator private EventAggregator: IEventAggregator,
		@I18N private I18N: I18N
	) {
	
		this.eventSubscription = EventAggregator.subscribe("shell:loaded", (msg, chnl) => {
			console.log('loaded');
			let jwt = this.Auth.getTokenPayload();
			this.userName = jwt.name;
		});
	}

	async logout() {
		await this.Auth.logout();
	}

	setLocale(loc: string) {
		console.log(loc);
		this.I18N.setLocale(loc);
	}


	dispose() {
		this.eventSubscription.dispose();
	}
}
