/* eslint-disable no-return-assign */
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';

import {
  bbvaReturn,
} from '@bbva-web-components/bbva-foundations-icons';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-form-toggle/bbva-web-form-toggle.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@bbva-web-components/bbva-web-notification-toast/bbva-web-notification-toast.js';

import commonStyles from '../../elements/styles/common-styles.js';
import styles from './settings-page-styles.js';

const returnIcon = bbvaReturn();

const DEFAULT_I18N_KEYS = {
  returnText: 'pages.return-text',
  settingsTitle: 'settings-page.title',
  headerText: 'settings-page.header-text',
  spanish: 'settings-page.language-1',
  english: 'settings-page.language-2',
  darkMode: 'settings-page.mode-dark',
  savingToast: 'settings-page.save'
};


/* eslint-disable new-cap */
class SettingsPage extends intl(CellsPage) {
  static get is() {
    return 'settings-page';
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      dark: {
        type: Boolean
      },
      setLang: {
        type: Boolean
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  static get styles() {
    return [commonStyles, styles];
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    return super.update && super.update(props);
  }

  firstUpdated(props) {
    // eslint-disable-next-line no-unused-expressions
    super.firstUpdated && super.firstUpdated(props);
    const queryScope = this.shadowRoot ? this.shadowRoot : this;
    this._dm = queryScope.querySelector(
      'demo-data-dm'
    );
    this.en = queryScope.querySelector('#en');
    this.es = queryScope.querySelector('#es');
    this.toast = queryScope.querySelector('bbva-web-notification-toast');
  }

  onPageEnter() {
    this.language = localStorage.getItem('language') || window.IntlMsg.lang;
    this.setLang = this.language === 'es-ES' ? true : false;
  }

  _setLang(e) {
    let lang;

    if (e.target.value === 'es-ES') {
      if (e.target.checked) {
        lang = 'es-ES';
        this.en.checked = false;
      } else {
        lang = 'en-US';
        this.en.checked = true;
      }
    } else {
      if (e.target.checked) {
        lang = 'en-US';
        this.es.checked = false;
      } else {
        lang = 'es-ES';
        this.es.checked = true;
      }
    }
    window.IntlMsg.lang = lang;
    localStorage.setItem('language', lang);
    this._dm.setUserSettings({lang});
  }

  _showToast() {
    this.toast.opened = true;
  }

  get _headerTpl() {
    return html `
      <div slot="app-header">
          <bbva-header-main
            text="${this.t(this.i18nKeys.headerText)}"
            icon-left-primary="${returnIcon}"
            accessibility-text-icon-left-primary="${this.t(this.i18nKeys.returnText)}"
            @header-main-icon-left-primary-click=${() => window.history.back()}>
          </bbva-header-main>
        </div>
    `;
  }

  get _mainContentTpl() {
    return html `
    <div slot="app-main-content" class="container">
          <div class="container-lang">
            <ul @change="${this._setLang}">
              <li>
                <bbva-web-form-toggle class="toggle" id="es" value="es-ES" ?checked="${this.setLang}" >${this.t(this.i18nKeys.spanish)}</bbva-web-form-toggle>
                <bbva-web-divider></bbva-web-divider>
              </li>
              <li>
                <bbva-web-form-toggle class="toggle" id="en" value="en-US" ?checked="${!this.setLang}" >${this.t(this.i18nKeys.english)}</bbva-web-form-toggle>
                <bbva-web-divider></bbva-web-divider>
              </li>
            </ul>
          </div>
          <bbva-web-notification-toast variant="success">
            <p>${this.t(this.i18nKeys.savingToast)}</p>
          </bbva-web-notification-toast>
          <demo-data-dm @settingsSaved="${this._showToast}"></demo-data-dm>
        </div>
    `;
  }

  render() {
    return html`
    <demo-app-template page-title="${this.t(this.i18nKeys.settingsTitle)}">
      ${this._headerTpl}
      ${this._mainContentTpl}
    </demo-app-template>`;
  }
}

window.customElements.define(SettingsPage.is, SettingsPage);
