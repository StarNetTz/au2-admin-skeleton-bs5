import { PublishToastChannel } from './../components/toaster/toasterChannels';
import { ToastType } from './../components/toaster/toastType';
import { IAurelia, IEventAggregator } from "aurelia";
import { IAppConfiguration } from '@starnetbih/au2-configuration';
import { IApiRegistry } from '@starnetbih/au2-api';
import { IAuthService } from '@starnetbih/au2-auth';
import { I18N } from '@aurelia/i18n';

export class LoginPage {

  usernameOrEmail: string;
  password: string;
  isBusy: boolean;

  constructor(@IAurelia private Aurelia: IAurelia,
    @IAppConfiguration private Configuration: IAppConfiguration,
    @IApiRegistry private Reg: IApiRegistry,
    @IAuthService private Auth: IAuthService,
    @IEventAggregator private ea: IEventAggregator,
    @I18N private I18N: I18N
  ) { }


  async login() {
    this.isBusy = true;
    try {
      let req = {
        credentials: { username: this.usernameOrEmail, password: this.password }
      };

      let u = await this.Auth.login(req);
    } catch (error) {

      this.ea.publish(PublishToastChannel, { type: ToastType.ERROR, title: this.I18N.tr('login.authenticationError'), message: this.I18N.tr('login.invalidUsernameOrPassword') });
    }
    finally {
      this.isBusy = false;
    }
  }

  async attached() {
    //Show login tip
    setTimeout(() => { this.forgotPassword() }, 100);
  }

  async forgotPassword() {
    this.ea.publish(PublishToastChannel, { type: ToastType.INFO, "title": this.I18N.tr('login.tipTitle'), message: this.I18N.tr('login.tipMessage') });
  }

  async loginGithub() {
    this.ea.publish(PublishToastChannel, { type: ToastType.ERROR, title: this.I18N.tr('login.authenticationError'), message: this.I18N.tr('login.githubProviderNotImplemented') });
  }

  async loginGoogle() {
    this.ea.publish(PublishToastChannel, { type: ToastType.ERROR, title: this.I18N.tr('login.authenticationError'), message: this.I18N.tr('login.googleProviderNotImplemented') });
  }

  setLocale(loc: string) {
    this.I18N.setLocale(loc);
  }
}
