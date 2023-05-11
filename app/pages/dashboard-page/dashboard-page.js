import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';

// import { layout2cols } from '../../elements/layouts/layouts.js';
import { bbvaMenu } from '@bbva-web-components/bbva-foundations-icons';
import { entityBBVAESMMXXX } from '@bbva-web-components/bbva-foundations-entities';
import { mask } from '@bbva-web-components/bbva-core-lit-helpers/utils/mask.js';
import { bbvaWebAmountAmbient } from '@bbva-web-components/bbva-web-amount';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import { MENU_ITEMS } from '../../scripts/app-routes.js';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-amount/bbva-web-amount.js';
import '@bbva-web-components/bbva-web-badge-variability/bbva-web-badge-variability.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-web-components/bbva-web-list-item-card/bbva-web-list-item-card.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import '@bbva-web-components/bbva-web-clip-card/bbva-web-clip-card.js';

import commonStyles from '../../elements/styles/common-styles.js';
import styles from './dashboard-page-styles.js';

import '@cells-demo/demo-data-dm/demo-data-dm.js';

const menu = bbvaMenu();
const entity = entityBBVAESMMXXX();
const DEFAULT_I18N_KEYS = {
  dashboardTitle: 'dashboard-page.title',
  accountTitle: 'dashboard-page.account-title',
  cardsTitle: 'dashboard-page.cards-title',
  cardsItemTitle: 'dashboard-page.cards-item-title',
};

class DashboardPage extends intl(CellsPage) {
  static get is() {
    return 'dashboard-page';
  }

  static get styles() {
    return [
      commonStyles,
      styles,
      bbvaWebAmountAmbient.dark,
      bbvaWebLinkAmbient.dark,
    ];
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      incomes: {
        type: Array,
        attribute: false,
      },
      accounts: {
        type: Array,
        attribute: false,
      },
      totalAmount: {
        type: String,
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
    this.publish('navigation_info', MENU_ITEMS);
    this.publish('login_info', true);

    this.incomes = [];
    this.accounts = [];
    this.totalAmount = '0';
    this.cards = [];
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
    this._dm = queryScope.querySelector('demo-data-dm');
    const gridDefaultPageTemplateNode =
      queryScope.querySelector('demo-app-template');
    Object.assign(gridDefaultPageTemplateNode.regionAttributes, {
      header: { ambient: 'dark400' },
      main: { ambient: 'light' },
      footer: { ambient: 'dark400' },
      'main-pre': { 'data-grid': 'full-width', ambient: 'dark300' },
    });

    this._menu.addEventListener(
      'header-main-icon-right-primary-click',
      this._openMenu.bind(this)
    );

    this._dm = queryScope.querySelector('demo-data-dm');
  }

  onPageEnter() {
    if (!this.incomes.length) {
      this._dm.getData();
    }

    if (this.language !== localStorage.getItem('language')) {
      this.language = localStorage.getItem('language');
      this._dm.getData();
    }
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  get _headerTpl() {
    return html`
      <bbva-header-main
        slot="app-header"
        .iconRightPrimary="${menu}"
        accessibility-text-icon-right-primary="bbvaMenu"
        image="https://movil.bbva.es/apps/woody/assets/vendor/res/img/logos/logo-white-1c1c2a68cc4c755b9ebacef725dd3421.svg"
      ></bbva-header-main>
    `;
  }

  get _appMainPreTpl() {
    return html` <div slot="app-main-pre">
      <ul class="carrousel" ambient="dark">
        ${this.incomes.map((obj) => {
    return html` <li class="card">
            <div class="card-item">
              <bbva-web-amount
                size="3xl"
                amount="${obj.first.amount}"
                currency-code="${obj.first.currency}"
                local-currency="${obj.first.currency}"
              ></bbva-web-amount>
              ${obj.second
    ? html` <div class="item-variability">
                    <bbva-web-badge-variability
                      size="m"
                      variant="${obj.first.variability}"
                    ></bbva-web-badge-variability>
                    <bbva-web-amount
                      size="m"
                      amount="${obj.second.amount}"
                      currency-code="${obj.second.currency}"
                      local-currency="${obj.second.currency}"
                    ></bbva-web-amount>
                  </div>`
    : html``}
              <bbva-web-link
                variant="subdued"
                class="card-link"
                href="https://www.bbva.es"
                target="_blank"
                >${obj.title}</bbva-web-link
              >
            </div>
          </li>`;
  })}
      </ul>
    </div>`;
  }

  get _mainContent() {
    return html` <div slot="app-main-content">
      <div class="account-card">
        <div class="account-card-title">
          <span>${this.t(this.i18nKeys.accountTitle)}</span>
          <bbva-web-amount
            variant="grey"
            amount="${this.totalAmount}"
            currency-code="EUR"
            local-currency="EUR"
          ></bbva-web-amount>
        </div>
        <bbva-web-divider></bbva-web-divider>
        <div class="account-card-item">
          ${this.accounts.map(
    (obj, index) => html`
              <bbva-web-list-item-card
                amount="${obj.amount}"
                card-number="${obj.account}"
                entity="${obj.entity}"
                heading="${obj.title}"
                masked=""
                @item-card-click="${this.accountClick}"
              >
                <span slot="header-description">${obj.status}</span>
              </bbva-web-list-item-card>
              ${index !== this.accounts.length - 1
    ? html`<bbva-web-divider></bbva-web-divider>`
    : html``}
            `
  )}
        </div>
      </div>
      <div class="account-card">
        <div class="account-card-title">
          <span>${this.t(this.i18nKeys.cardsTitle)}</span>
        </div>
        <bbva-web-divider></bbva-web-divider>
        ${this.cards.map(
    (obj, index) => html`
            <div
              class="card-item"
              @click="${this._cardClick}"
              @keydown="${()=>{}}"
              data-card="${obj.cardNumber}"
            >
              <div class="card-item-title">
                <bbva-web-link class="cardLink"
                  >${this.t(this.i18nKeys.cardsItemTitle)} ${obj.title}
                  ${mask(obj.cardNumber, '•', true, 4)}</bbva-web-link
                >
              </div>
              <div class="card-holder">
                <bbva-web-clip-card variant="${obj.type}" size="s"
                  >Card</bbva-web-clip-card
                >
                <span>${mask(obj.cardNumber, '•', true, 4)}</span>
              </div>
            </div>
            ${index !== (this.cards.length - 1)
    ? html`<bbva-web-divider></bbva-web-divider>`
    : html``}
          `
  )}
      </div>

      <demo-data-dm @Data="${this._getData}"></demo-data-dm>
    </div>`;
  }

  render() {
    return html` <demo-app-template
      page-title="${this.t(this.i18nKeys.dashboardTitle)}"
    >
      ${this._headerTpl} ${this._appMainPreTpl} ${this._mainContent}
    </demo-app-template>`;
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

  accountClick({ target }) {
    this.navigate('movements', { id: target.cardNumber });
  }

  _cardClick(ev) {
    const datasetCard = ev
      .composedPath()
      .find(
        (data) => data instanceof HTMLElement && data.hasAttribute('data-card')
      );

    this.navigate('cards', { id: datasetCard.dataset.card });
  }

  _getData(ev) {
    this.incomes = ev.detail.incomes;
    this.accounts = ev.detail.accounts;
    this.cards = ev.detail.cards;
    this.totalAmount = ev.detail.totalAmount;
  }

}
window.customElements.define(DashboardPage.is, DashboardPage);
