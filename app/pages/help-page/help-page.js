/* eslint-disable no-return-assign */
import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';

import { bbvaReturn } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@cells-demo/demo-app-template/demo-app-template.js';

const returnIcon = bbvaReturn();

const DEFAULT_I18N_KEYS = {
  returnText: 'pages.return-text',
  headerText: 'help-page.header-text',
  helpTitle: 'help-page.title',
  text: 'help-page.text',
  first: 'help-page.first-li',
  second: 'help-page.second-li',
  third: 'help-page.third-li',
  fourth: 'help-page.fourth-li',
  fifth: 'help-page.fifth-li',
};

/* eslint-disable new-cap */
class PageAPage extends intl(CellsPage) {
  static get is() {
    return 'help-page';
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
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

  onPageEnter() {
    this.language = localStorage.getItem('language');
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  get _headerTpl() {
    return html`
      <div slot="app-header">
        <bbva-header-main
          text="${this.t(this.i18nKeys.headerText)}"
          icon-left-primary="${returnIcon}"
          accessibility-text-icon-left-primary="${this.t(
    this.i18nKeys.returnText
  )}"
          @header-main-icon-left-primary-click=${() => window.history.back()}
        >
        </bbva-header-main>
      </div>
    `;
  }

  get _mainContentTpl() {
    return html`
      <div slot="app-main-content">
        <p>${this.t(this.i18nKeys.text)}</p>
        <ul>
          <li>${this.t(this.i18nKeys.first)}</li>
          <li>${this.t(this.i18nKeys.second)}</li>
          <li>${this.t(this.i18nKeys.third)}</li>
          <li>${this.t(this.i18nKeys.fourth)}</li>
          <li>${this.t(this.i18nKeys.fifth)}</li>
        </ul>
      </div>
    `;
  }

  render() {
    return html` <demo-app-template page-title="${this.t(this.i18nKeys.helpTitle)}">
      ${this._headerTpl} ${this._mainContentTpl}
    </demo-app-template>`;
  }
}

window.customElements.define(PageAPage.is, PageAPage);
