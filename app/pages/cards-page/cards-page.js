/* eslint-disable no-return-assign */
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';

import {
  bbvaMenu,
  bbvaReturn,
} from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-foundations-grid-default-layout/bbva-foundations-grid-default-layout.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-panel-multistep-offer/bbva-web-panel-multistep-offer.js';
import '@bbva-web-components/bbva-web-list-item-movement/bbva-web-list-item-movement.js';
import '@bbva-web-components/bbva-web-list-item-movement/bbva-web-list-item-movement-preloading.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import { MENU_ITEMS } from '../../scripts/app-routes.js';

import commonStyles from '../../elements/styles/common-styles.js';
import styles from './cards-page-styles.js';

const menuIcon = bbvaMenu();
const returnIcon = bbvaReturn();

const DEFAULT_I18N_KEYS = {
  returnText: 'pages.return-text',
  cardsTitle: 'cards-page.title',
  cardsItemTitle: 'cards-page.cards-item-title',
  cardMovements: 'cards-page.cards-movements',
};

class CardsPage extends intl(CellsPage) {
  static get is() {
    return 'cards-page';
  }

  static get styles() {
    return [commonStyles, styles];
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      cardMovements: {
        type: Array,
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
    this.cardMovements = [];
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
      'main-pre': { ambient: 'light100' },
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
    this.panel = queryScope.querySelector('bbva-web-panel-multistep-offer');

    this._initData();
  }

  _openMenu({ detail }) {
    if (detail) {
      this._emit('open-drawer-state');
    } else {
      this._emit('close-drawer-state');
    }
  }

  _backNavigation(detail) {
    this.navigate('dashboard');
  }

  _emit(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
      })
    );
  }

  onPageEnter() {
    const id = this.params.id;
    this.dm.getCardDetail(id);
    this.language = localStorage.getItem('language');
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  onPageLeave() {
    this._initData();
  }

  _initData() {
    this.panel.cardData = {
      variant: 'debit',
      kind: 'debit',
      kindPayment: '',
      cardNumber: '',
      expirationDate: '',
      holderName: '',
    };
    this.cardMovements = [];
    this.panel.panelTitle = `${this.t(this.i18nKeys.cardsItemTitle)} `;
  }

  _getData(ev) {
    this.panel.cardData = ev.detail.data;
    this.panel.panelTitle = `${this.t(this.i18nKeys.cardsItemTitle)} ${
      ev.detail.data.title
    }`;
    this.cardMovements = ev.detail.movements;
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
        text="${this.t(this.i18nKeys.cardMovements)}"
      ></bbva-header-main>
    `;
  }

  get _cardContainerTpl() {
    return html`
      <div slot="app-main-pre" data-grid="full-width">
        <bbva-web-panel-multistep-offer
          type="card"
        ></bbva-web-panel-multistep-offer>
      </div>
    `;
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
    return html`
      <div slot="app-main-content" data-grid="full-width">
        <ul class="list">
          ${this.cardMovements.length === 0
    ? html` ${preloadingtlp} `
    : this.cardMovements.map(
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

        <demo-data-dm @card="${this._getData}"></demo-data-dm>
      </div>
    `;
  }

  render() {
    return html` <demo-app-template
      page-title="${this.t(this.i18nKeys.cardsTitle)}"
    >
      ${this._headerTpl} ${this._cardContainerTpl} ${this._mainContentTpl}
    </demo-app-template>`;
  }
}

window.customElements.define(CardsPage.is, CardsPage);
