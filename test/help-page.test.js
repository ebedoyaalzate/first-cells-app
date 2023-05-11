/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../app/pages/help-page/help-page.js';

import sinon from 'sinon';

suite('help-page', () => {
  let el;
  let elementShadowRoot;

  teardown(() => fixtureCleanup());

  suite('help-page - with no configuration', () => {
    setup(async () => {
      localStorage.setItem('language', 'es-ES');
      el = await fixture(
        html`
          <help-page></help-page>
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

    test('testing onPage Enter', ()=>{
      el.onPageEnter();
      assert.equal(el.language,'es-ES');
    });
  });
});
