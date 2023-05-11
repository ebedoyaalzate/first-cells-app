/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`[slot=app-main-content] {
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  height: inherit;
}

.main-inputs {
  margin: auto 0;
}
.main-inputs .input {
  margin-bottom: 1rem;
}

.input-link {
  display: block;
  text-align: right;
}

.main-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-buttons .input {
  margin-bottom: 1rem;
  min-width: 13rem;
}
`;