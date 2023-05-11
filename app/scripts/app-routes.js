import {
  bbvaSupport,
  bbvaAddressbook,
  bbvaAtm,
  bbvaAccount,
  bbvaSettings
} from '@bbva-web-components/bbva-foundations-icons';



/*
 * NOTE: "path" field has to be unique, if not it will use the 1st match
 */
export const NAVIGATION = [
  {
    path: '/',
    page: 'login',
  },
  {
    path: '/help',
    page: 'help',
    icon: bbvaSupport,
  },
  {
    path: '/dashboard',
    page: 'dashboard',
    label: 'menu.dashboard',
    icon: bbvaAccount,
    event: 'dashboard-click'
  },
  {
    path: '/movements/:id',
    page: 'movements',
    label: 'menu.account-movements',
    icon: bbvaAddressbook,
    notifications: 2,
    event: 'movement-click'
  },
  {
    path: '/cards',
    page: 'cards',
    label: 'menu.card-movements',
    icon: bbvaAtm,
    event: 'cards-click'
  },
  {
    path: '/settings',
    page: 'settings',
    label: 'menu.settings',
    icon: bbvaSettings,
    event: 'settings-click'
  },
];

export const ROUTES = NAVIGATION.reduce((res, value) => {
  if (!res[value.page]) {
    res[value.page] = value.path;
  }
  return res;
}, {});

export const MENU_ITEMS = NAVIGATION.filter((ev) => ev.label).map((ev) => {
  delete ev.path;
  const res = ev;
  if (ev.icon) {
    res.icon = ev.icon();
  }
  return res;
});
