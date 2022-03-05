import { IAurelia, Aurelia, IEventAggregator } from "aurelia";
import { IAppConfiguration } from '@starnetbih/au2-configuration';
import { IApiRegistry } from '@starnetbih/au2-api';
import { IAuthService } from '@starnetbih/au2-auth';
import { Toast } from 'bootstrap'
import { I18N } from '@aurelia/i18n';

export class LoginPage {

  usernameOrEmail: string;
  password: string;
  errorMessage: string;
  toast: Toast;
  isBusy:boolean;

  constructor(@IAurelia private Aurelia: IAurelia,
    @IAppConfiguration private Configuration: IAppConfiguration,
    @IApiRegistry private Reg: IApiRegistry,
    @IAuthService private Auth: IAuthService,
    @IEventAggregator private ea: IEventAggregator,
    @I18N private I18N: I18N
  ) {
    console.log("evo me konstr login");
  }

  async login() {
    this.isBusy = true;
    try {
      let req = {
        credentials: { username: this.usernameOrEmail, password: this.password }
      };

      let u = await this.Auth.login(req);
    } catch (error) {
      this.errorMessage = this.I18N.tr('login.invalidUsernameOrPassword');
      this.toast.show();
    }
    finally
    {
      this.isBusy = false;
    }
  }

  attached() {
    let toasts = Array.from(document.querySelectorAll('.toast'));
    let tn = toasts[0];
    this.toast = new Toast(tn);
  }

  async loginGithub() {
    this.errorMessage = this.I18N.tr('login.githubProviderNotImplemented');
    this.toast.show();
  }

  async loginGoogle() {
    this.errorMessage = this.I18N.tr('login.googleProviderNotImplemented');
    this.toast.show();
  }

  setLocale(loc: string) {
    this.I18N.setLocale(loc);
  }
}
