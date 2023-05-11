/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../app/pages/cards-page/cards-page.js';

import sinon from 'sinon';

suite('cards-page', () => {
  let el;
  let elementShadowRoot;

  teardown(() => fixtureCleanup());

  suite('cards-page - with no configuration', () => {
    setup(async () => {
      el = await fixture(
        html`
          <cards-page></cards-page>
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

    test('back Navigation', ()=>{
      const stub = sinon.stub(el, "navigate");
      el._backNavigation();
      assert.isTrue(stub.called);
    });

    test('get data method', ()=>{
      el._getData({detail: { data: 'data', movements: []}});
      assert.equal(el.panel.cardData , 'data');
    });

    test('check on page enter', ()=>{
      el.params = '0000000000000123';
      localStorage.setItem('language', 'es-ES');
      el.onPageEnter();
      assert.equal(el.language, 'es-ES');
    });

    test('check on page leave', ()=>{
      el.account = '0000000000000123';
      el.onPageLeave();
      assert.equal(el.cardMovements.length, 0);
    }); 

    
  });
});
