/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../app/pages/dashboard-page/dashboard-page.js';

import sinon from 'sinon';

suite('dashboard-page', () => {
  let el;
  let elementShadowRoot;

  teardown(() => fixtureCleanup());

  suite('dashboard-page - with no configuration', () => {
    setup(async () => {
      el = await fixture(
        html`
          <dashboard-page></dashboard-page>
        `,
      );
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    test('SHADOW DOM - Structure test', () => {
      assert.shadowDom.equalSnapshot(el);
    });

    test('LIGHT DOM - Structure test', () => {
      assert.lightDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
    });

    test('check open menu event', async (done)=>{
      const spy = sinon.spy();
      el.addEventListener('open-drawer-state', spy);
      el._openMenu({detail: true});
      assert.isTrue(spy.called);
      done();
    });

    test('check close menu event', async (done)=>{
      const spy = sinon.spy();
      el.addEventListener('close-drawer-state', spy);
      el._openMenu({detail: false});
      assert.isTrue(spy.called);
      done();
    });

    test('chechk accountClick method', ()=>{
      const stub = sinon.stub(el, "navigate");
      el.accountClick({target: {cardNumber: '000000001223'}});
      assert.isTrue(stub.called);
    });

    test('get data method', ()=>{
      el._getData({detail: { incomes: 'data', accounts: [], cards: [], totalAmount: 9999}});
      assert.equal(el.totalAmount , 9999);
    });

    test('check on page enter', ()=>{
      el.onPageEnter();
      assert.equal(el.language, 'es-ES');

      el.incomes = ['1','2','3'];
      localStorage.setItem('language','en-US');
      el.onPageEnter();

      assert.equal(el.language, 'en-US');
    });
  });

  suite('dashboard-page - with configuration', () => {
    setup(async () => {
      el = await fixture(
        html`
          <dashboard-page></dashboard-page>
        `,
      );
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
      el.cards = [
        {
          cardNumber: '0000000000001234',
          type: 'debit',
          title: 'debito',
        },
        {
          cardNumber: '0000000000005678',
          type: 'credit',
          title: 'credito',
        },
        {
          cardNumber: '0000000000002361',
          type: 'prepay',
          title: 'prepago',
        },
      ];
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    test('SHADOW DOM - Structure test', () => {
      assert.shadowDom.equalSnapshot(el);
    });

    test('LIGHT DOM - Structure test', () => {
      assert.lightDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
    });
  });
});
