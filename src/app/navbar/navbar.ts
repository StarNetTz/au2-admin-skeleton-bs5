
import { IDisposable, IEventAggregator } from 'aurelia';
import { IAuthService } from '@starnetbih/au2-servicestack-auth';
import { I18N } from '@aurelia/i18n';
export class Navbar {
	public userName: string;
	eventSubscription: IDisposable;

	constructor(
		@IAuthService private Auth: IAuthService,
		@IEventAggregator private EventAggregator: IEventAggregator,
		@I18N private I18N: I18N
	) {
		this.eventSubscription = EventAggregator.subscribe("shell:loaded", () => {
			/* const jwt = this.Auth.getTokenPayload();
			this.userName = jwt.name; */
		});
	}

	async logout() {
		await this.Auth.signOut();
	}

	setLocale(loc: string) {
		this.I18N.setLocale(loc);
	}

	dispose() {
		this.eventSubscription.dispose();
	}
}