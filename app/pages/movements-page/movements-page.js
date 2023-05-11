/* eslint-disable no-return-assign */
import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';

// import { layout2cols } from '../../elements/layouts/layouts.js';
import {
  bbvaMenu,
  bbvaReturn,
} from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-foundations-grid-default-layout/bbva-foundations-grid-default-layout.js';
import '@bbva-web-components/bbva-web-list-item-movement/bbva-web-list-item-movement.js';
import '@bbva-web-components/bbva-web-list-item-movement/bbva-web-list-item-movement-preloading.js';
import '@bbva-web-components/bbva-web-panel-button/bbva-web-panel-button.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import { bbvaWebPanelButtonAmbient } from '@bbva-web-components/bbva-web-panel-button';
import { bbvaWebListItemMovementPreloadingAmbient } from '@bbva-web-components/bbva-web-list-item-movement';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import { MENU_ITEMS } from '../../scripts/app-routes.js';

import commonStyles from '../../elements/styles/common-styles.js';

const menuIcon = bbvaMenu();
const returnIcon = bbvaReturn();

const DEFAULT_I18N_KEYS = {

  returnText: 'pages.return-text',
  movementsTitle: 'movements-page.title',
  accountMovements: 'movements-page.account-movements',
};

/* eslint-disable new-cap */
class MovementsPage extends intl(CellsPage) {
  static get is() {
    return 'movements-page';
  }

  static get styles() {
    return [
      commonStyles,
      bbvaWebPanelButtonAmbient.dark,
      bbvaWebListItemMovementPreloadingAmbient.dark,
    ];
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      _id: {
        type: String,
      },
      accountsMovement: {
        type: Array,
        attribute: false,
      },
      account: {
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
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.account = {};
    this.accountsMovement = [];
    this.i18nKeys = DEFAULT_I18N_KEYS;
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
    this._menu = queryScope.querySelector('bbva-header-main');
    this.dm = queryScope.querySelector('demo-data-dm');
    const gridDefaultPageTemplateNode =
      queryScope.querySelector('demo-app-template');
    Object.assign(gridDefaultPageTemplateNode.regionAttributes, {
      header: { ambient: 'dark400' },
      main: { ambient: 'light' },
      footer: { ambient: 'dark300' },
      'main-pre': { ambient: 'dark300' },
    });

    this.publish('navigation_info', MENU_ITEMS);
    this.publish('login_info', true);

    this._menu.addEventListener(
      'header-main-icon-right-primary-click',
      this._openMenu.bind(this)
    );
    this._menu.addEventListener(
      'header-main-icon-left-primary-click',
      this._backNavigation.bind(this)
    );
  }

  onPageEnter() {
    this._id = this.params.id;
    this.dm.getAccountMovement(this._id);
    this.language = localStorage.getItem('language');
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  onPageLeave() {
    this.account = {};
    this.accountsMovement = [];
  }

  _openMenu({ detail }) {
    if (detail) {
      this._emit('open-drawer-state');
    } else {
      this._emit('close-drawer-state');
    }
  }

  _emit(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
      })
    );
  }

  _backNavigation(detail) {
    this.navigate('dashboard');
  }

  _getData(ev) {
    this.account = ev.detail.data;
    this.accountsMovement = ev.detail.movements;
  }

  get _headerTpl() {
    return html`
      <bbva-header-main
        slot="app-header"
        .iconRightPrimary="${menuIcon}"
        .iconLeftPrimary="${returnIcon}"
        accessibility-text-icon-right-primary="Menu"
        accessibility-text-icon-left-primary="${this.t(
    this.i18nKeys.returnText
  )}"
        text="${this.t(this.i18nKeys.accountMovements)}"
      ></bbva-header-main>
    `;
  }

  get _appMainPreTpl() {
    return html` <div
      slot="app-main-pre"
      data-grid="full-width"
      ambient="dark400"
    >
      ${!this.account.amount
    ? html` <bbva-web-list-item-movement-preloading></bbva-web-list-item-movement-preloading>`
    : html`
            <bbva-web-panel-button
              amount="${this.account.amount}"
              description1="${this.account.status}"
              description2="Cuenta"
              label="${this.account.title}"
            >
            </bbva-web-panel-button>
          `}
    </div>`;
  }

  get _mainContentTpl() {
    const preloading = 4;
    const preloadingtlp = [];
    for (let i = 0; i < preloading; i++) {
      preloadingtlp.push(html` <li class="item">
        <bbva-web-list-item-movement-preloading></bbva-web-list-item-movement-preloading>
        <bbva-web-divider></bbva-web-divider>
      </li>`);
    }
    return html` <div slot="app-main-content" data-grid="full-width">
      <ul class="list">
        ${this.accountsMovement.length === 0
    ? html` ${preloadingtlp} `
    : this.accountsMovement.map(
      (movement) => html`
                <li class="item">
                  <bbva-web-list-item-movement
                    amount="${movement.amount}"
                    .category="${movement.category}"
                    description="${movement.description}"
                    entity-number="${movement.entityNumber}"
                    heading="${movement.heading}"
                    masked=""
                    .statusHighlight="${movement.highlight}"
                    .status="${movement.status}"
                  >
                  </bbva-web-list-item-movement>
                  <bbva-web-divider></bbva-web-divider>
                </li>
              `
    )}
      </ul>

      <demo-data-dm @account="${this._getData}"></demo-data-dm>
    </div>`;
  }

  render() {
    return html` <demo-app-template
      page-title="${this.t(this.i18nKeys.movementsTitle)}"
    >
      ${this._headerTpl} ${this._appMainPreTpl} ${this._mainContentTpl}
    </demo-app-template>`;
  }
}

window.customElements.define(MovementsPage.is, MovementsPage);
