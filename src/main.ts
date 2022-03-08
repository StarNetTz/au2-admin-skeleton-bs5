
import 'bootstrap';
import { Aurelia, RouterConfiguration } from 'aurelia';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { Shell } from './shell/shell';
import { AppConfigurationPlugin } from '@starnetbih/au2-configuration';
import { ApiPlugin } from '@starnetbih/au2-api';
import { AureliaAuthPlugin } from '@starnetbih/au2-auth';
import { I18nConfiguration } from '@aurelia/i18n';
import Fetch from 'i18next-fetch-backend';
import { ValidationI18nConfiguration } from '@aurelia/validation-i18n';

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
          loadPath: '/locales/{{lng}}/{{ns}}.json'
        }
      };
    }),
    ValidationI18nConfiguration.customize((options) => {
      options.DefaultKeyPrefix = "validation";
    }),
    ValidationHtmlConfiguration.customize((options) => {
      options.SubscriberCustomElementTemplate = `
      <slot></slot>
      <slot name='secondary'>
        <span style="color:red;" repeat.for="error of errors">
          \${error.result.message}
        </span>
      </slot>
      `;
    })
  )
  .app(Shell)
  .start();
