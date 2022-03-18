import 'bootstrap';
import { Aurelia, RouterConfiguration } from 'aurelia';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { Shell } from './shell/shell';
import { AureliaConfigurationConfiguration } from '@starnetbih/au2-configuration';
import { AureliaApiConfiguration } from '@starnetbih/au2-api';
import { AureliaAuthConfiguration } from '@starnetbih/au2-auth';
import { I18nConfiguration } from '@aurelia/i18n';
import Fetch from 'i18next-fetch-backend';
import { ValidationI18nConfiguration } from '@aurelia/validation-i18n';
import { Toaster } from '@starnetbih/au2-toaster';
import * as PaginatorComponents from '@starnetbih/au2-paginator';

Aurelia
  .register(
    RouterConfiguration,
    AureliaConfigurationConfiguration,
    AureliaAuthConfiguration.configure({responseTokenProp: 'bearerToken', logoutRedirect : null, loginRedirect:null}),
    AureliaApiConfiguration,
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
    }),
    Toaster,
    PaginatorComponents
  )
  .app(Shell)
  .start();
