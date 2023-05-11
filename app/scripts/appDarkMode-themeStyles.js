import { bbvaHeaderMainDarkModeThemeStyles } from '@bbva-web-components/bbva-header-main/index.js';
import { demoAppContainerDarkModeThemeStyles } from '@cells-demo/demo-app-container';
import { demoAppTemplateDarkModeThemeStyles } from '@cells-demo/demo-app-template';
import { default as helpPageDarkModeThemeStyles } from '../pages/help-page/helpPageDarkMode-themeStyles.js';
import { default as loginPageDarkModeThemeStyles } from '../pages/login-page/LoginPageDarkMode-themeStyles.js';

export default {
  ...bbvaHeaderMainDarkModeThemeStyles,
  ...demoAppContainerDarkModeThemeStyles,
  ...demoAppTemplateDarkModeThemeStyles,
  ...helpPageDarkModeThemeStyles,
  ...loginPageDarkModeThemeStyles,
};