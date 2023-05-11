/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../app/pages/login-page/login-page.js';

import sinon from 'sinon';

suite('login-page', () => {
  let el;
  let elementShadowRoot;

  teardown(() => fixtureCleanup());

  suite('login-page - with no configuration', () => {
    setup(async () => {
      el = await fixture(
        html`
          <login-page></login-page>
        `,
      );
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    test('SHADOW DOM - Structure test', () => {
      assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id','aria-describedby'] });
    });

    test('LIGHT DOM - Structure test', () => {
      assert.lightDom.equalSnapshot(el, { ignoreAttributes: ['id', 'aria-describedby'] });
    });

    test('navigation function', () => {
      const stub = sinon.stub(el, "navigate");
      el._navigateHelp(new CustomEvent('click'));
      assert.isTrue(stub.called);
    });

    test('do login', ()=>{
      const stub = sinon.stub(el._dm, "getUserSettings");
      el._doLogin(new CustomEvent('click'));
      assert.isTrue(stub.called);
    });

    test('do checkRequire', ()=>{
      el._checkRequire();
      assert.isTrue(el._controlItems.button.disabled);
      el._controlItems.user.value = 'asdasdasd';
      el._controlItems.password.value = '3123123213';
      el._checkRequire();
      assert.isFalse(el._controlItems.button.disabled);
    });

    test('do _getUserSettings', ()=>{
      const stub = sinon.stub(el, "navigate");
      el._getUserSettings({detail:{lang: 'es-ES'}});
      assert.isTrue(stub.called);
    });
  });
});
