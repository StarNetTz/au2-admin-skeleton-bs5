import { IAuthService } from '@starnetbih/au2-auth';

export class MyProfile {
	username: string;
	displayName: string;
	email: string;
	permissions: string[];
	roles: string[];

	constructor(@IAuthService private Auth: IAuthService) {
	}

	binding() {
		let jwt = this.Auth.getTokenPayload();
		this.username = jwt.preferred_username;
		this.displayName = jwt.name;
		this.email = jwt.email;
		this.permissions = jwt.perms;
		this.roles = jwt.roles;
	}
}