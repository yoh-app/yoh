import { themes } from './index';

// export interface ITheme {
//   [key: string]: string;
// }

// export interface IThemes {
//   [key: string]: ITheme;
// }

// export interface IMappedTheme {
//   [key: string]: string | null;
// }

export const mapTheme = (variables) => {
  return {
    '--accent': variables.accent400,
    '--accent-hover': variables.accent600,
    '--accent-50': variables.accent50,
    '--accent-100': variables.accent100,
    '--accent-200': variables.accent200,
    '--accent-300': variables.accent300,
    '--accent-400': variables.accent400,
    '--accent-500': variables.accent500,
    '--accent-600': variables.accent600,
    '--accent-700': variables.accent700,
  };
};

export const extend = (
  extending,
  newTheme
) => {
  return { ...extending, ...newTheme };
};

/**
 * Helper function to set a new theme
 *
 * @param {string} theme The name of the theme to be set
 *
 * @return {void}
 */
export const applyTheme = (theme) => {
  const themeObject = mapTheme(themes[theme]);
  if (!themeObject) return;
  const root = document.documentElement;

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return;
    }

    root.style.setProperty(property, themeObject[property]);
  });
};
