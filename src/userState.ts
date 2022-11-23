import { IDisposable, IEventAggregator } from "aurelia";
import { SS_AUTH_CHANNEL_SIGNED_IN, SS_AUTH_CHANNEL_SIGNED_OUT } from '@starnetbih/au2-servicestack-auth';

export interface IUser {
	user: UserState;
	hasAnyRole(roles: string[]): boolean;
}

export class User implements IUser {
	signInSub: IDisposable;
	signOutSub: IDisposable;
	user: UserState;

	hasAnyRole(roles: string[]): boolean {
		if (!this.user.isAuthenticated)
			return false;
		for (const r of roles)
			if (this.user.roles.includes(r))
				return true;
		return false;
	}


	constructor(@IEventAggregator private ea: IEventAggregator) {
		this.user = new UserState();

		this.signInSub = this.ea.subscribe(SS_AUTH_CHANNEL_SIGNED_IN, (profile) => {
			this.user = profile as UserState;
		});

		this.signOutSub = this.ea.subscribe(SS_AUTH_CHANNEL_SIGNED_OUT, () => {
			this.user = new UserState();
		});
	}
}

export class UserState {
	isAuthenticated = false;
	userId: '';
	userName: '';
	displayName: '';
	email: '';
	sessionId: '';
	roles: string[];
	permissions: string[];
	image: '';
}
