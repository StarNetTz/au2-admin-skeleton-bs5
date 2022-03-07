import { PublishToastChannel } from './../components/toaster/toasterChannels';
import { ToastType } from './../components/toaster/toastType';
import { IAurelia, IEventAggregator } from "aurelia";
import { IAppConfiguration } from '@starnetbih/au2-configuration';
import { IApiRegistry } from '@starnetbih/au2-api';
import { IAuthService } from '@starnetbih/au2-auth';
import { I18N } from '@aurelia/i18n';

import { newInstanceForScope } from '@aurelia/kernel';
import { IValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';

export class LoginPage {

  usernameOrEmail: string;
  password: string;
  isBusy: boolean;

  private credentials: Credentials;

  constructor(@IAurelia private Aurelia: IAurelia,
    @IAppConfiguration private Configuration: IAppConfiguration,
    @IApiRegistry private Reg: IApiRegistry,
    @IAuthService private Auth: IAuthService,
    @IEventAggregator private ea: IEventAggregator,
    @I18N private I18N: I18N,
    @newInstanceForScope(IValidationController) private ValidationController: IValidationController,
    @IValidationRules ValidationRules: IValidationRules
  ) {

    this.credentials = new Credentials();
    ValidationRules
      .on(this.credentials)
      .ensure('username')
      .required()
      .ensure('password')
      .required()
      .min(2);
  }


  async login() {
    const result = await this.ValidationController.validate();
    console.log(this.credentials);
    console.log(result);
    if (result.valid) {
      await this.tryLogin();
    }
    else {
      console.log('rinaka');
      throw ('validation exception');
    }
  }

  private async tryLogin() {
    try {
      this.isBusy = true;
      let req = {
        credentials: this.credentials
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


class Credentials {

  public username: string;
  public password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

}