
import 'bootstrap';
import Aurelia, { Registration, RouterConfiguration } from 'aurelia';
import { IValidationController, ValidationController, ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { Shell } from './shell/shell';
import { AppConfigurationPlugin } from '@starnetbih/au2-configuration';
import { ApiPlugin } from '@starnetbih/au2-api';
import { AureliaAuthPlugin } from '@starnetbih/au2-auth';
import { I18nConfiguration } from '@aurelia/i18n';
import Fetch from 'i18next-fetch-backend';

Aurelia
  .register(
    RouterConfiguration,
    AppConfigurationPlugin,
    AureliaAuthPlugin.configure(cfg => {
      cfg.responseTokenProp = 'bearerToken';
      cfg.logoutRedirect = null;
      cfg.loginRedirect = null;
    }),
    ApiPlugin,
    I18nConfiguration.customize((options) => {
      options.initOptions = {
        plugins: [Fetch],
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        }
      };
    }),
    ValidationHtmlConfiguration   
  )
  .app(Shell)
  .start();
