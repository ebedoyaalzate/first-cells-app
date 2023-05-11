import { default as darkModeStyles } from './appDarkMode-themeStyles.js';
import { setDocumentComponentsDarkModeStyles } from '@bbva-web-components/bbva-core-lit-helpers/src/BbvaCoreLitThemeHelpers';

setDocumentComponentsDarkModeStyles([ darkModeStyles ]);

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector(':root').setAttribute('color-scheme-dark', 'true');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ev => {
    const newColorScheme = ev.matches ? 'dark' : 'light';
    window.__colorScheme = newColorScheme;
    if (newColorScheme === 'dark') {
        document.querySelector(':root').setAttribute('color-scheme-dark', 'true');
    } else {
        document.querySelector(':root').removeAttribute('color-scheme-dark');
    }
});