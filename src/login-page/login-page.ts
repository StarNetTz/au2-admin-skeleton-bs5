import { IEventAggregator } from "aurelia";
import { IAuthService } from '@starnetbih/au2-auth';
import { I18N } from '@aurelia/i18n';
import { newInstanceForScope } from '@aurelia/kernel';
import { IValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';
import { TOASTER_PUBLISH_EA_CHANNEL, ToastType } from "@starnetbih/au2-toaster";

export class LoginPage {

  isBusy: boolean;
  credentials: Credentials;

  constructor(
    @IAuthService private Auth: IAuthService,
    @IEventAggregator private ea: IEventAggregator,
    @I18N private I18N: I18N,
    @newInstanceForScope(IValidationController) private ValidationController: IValidationController,
    @IValidationRules ValidationRules: IValidationRules
  ) {

    this.credentials = new Credentials();

    ValidationRules
      .on(this.credentials)
      .ensure("username")
      .required()
      .minLength(2)
      .ensure('password')
      .required()
      .minLength(2)
  }

  async login() {
    const result = await this.ValidationController.validate();
    console.log(this.ValidationController);
    console.log(result);
    if (result.valid)
      await this.tryLogin();
  }

  private async tryLogin() {
    try {
      this.isBusy = true;
      const req = {
        credentials: this.credentials
      };

      await this.Auth.login(req);
    } catch (error) {

      this.ea.publish(TOASTER_PUBLISH_EA_CHANNEL, { type: ToastType.ERROR, title: this.I18N.tr('login.authenticationError'), message: this.I18N.tr('login.invalidUsernameOrPassword') });
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
    this.ea.publish(TOASTER_PUBLISH_EA_CHANNEL, { type: ToastType.INFO, "title": this.I18N.tr('login.tipTitle'), message: this.I18N.tr('login.tipMessage') });
  }

  async loginGithub() {
    this.ea.publish(TOASTER_PUBLISH_EA_CHANNEL, { type: ToastType.ERROR, title: this.I18N.tr('login.authenticationError'), message: this.I18N.tr('login.githubProviderNotImplemented') });
  }

  async loginGoogle() {
    this.ea.publish(TOASTER_PUBLISH_EA_CHANNEL, { type: ToastType.ERROR, title: this.I18N.tr('login.authenticationError'), message: this.I18N.tr('login.googleProviderNotImplemented') });
  }

  setLocale(loc: string) {
    this.I18N.setLocale(loc);
  }
}


class Credentials {
  public username = '';
  public password = '';
}