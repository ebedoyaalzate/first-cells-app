/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`.carrousel {
  display: flex;
  padding: 0;
  width: 100%;
  margin: 0;
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carrousel::-webkit-scrollbar {
  display: none;
}

.card {
  display: inline-block;
  min-height: 5rem;
  flex: 1 0 calc(50% - 1rem);
  background-color: var(--colorsPrimaryCoreDarkened, ${unsafeCSS(foundations.colors.primaryCoreDarkened)});
  color: #fff;
  padding: 1rem 1rem;
}
.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.card-link {
  justify-content: flex-start;
}

.card:nth-child(n) {
  margin: 1rem 0.25rem;
}

.account-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px 0 rgba(18, 18, 18, 0.2);
  margin: 2rem 0;
}
.account-card-title {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  color: var(--colorsSecondary600, ${unsafeCSS(foundations.colors.secondary600)});
  text-transform: uppercase;
  font-size: 0.875rem;
  line-height: 1.5rem;
}
.account-card .card-item {
  padding: 1rem;
  cursor: pointer;
}
.account-card .card-item .card-holder {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}
.account-card .card-item .card-holder span {
  margin-top: 0.5rem;
}
.account-card .card-item-title {
  display: flex;
  justify-content: space-between;
}
`;