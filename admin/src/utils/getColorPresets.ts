// theme
import palette from '../theme/palette';
// @type
import { ThemeColorPresets } from '../components/settings/type';

// ----------------------------------------------------------------------

export const colorPresets = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: 'purple',
    lighter: '#EBD6FD',
    light: '#B985F4',
    main: '#7635dc',
    dark: '#431A9E',
    darker: '#200A69',
    contrastText: '#fff',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#D1FFFC',
    light: '#76F2FF',
    main: '#1CCAFF',
    dark: '#0E77B7',
    darker: '#053D7A',
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#CCDFFF',
    light: '#6697FF',
    main: '#0045FF',
    dark: '#0027B7',
    darker: '#00137A',
    contrastText: '#fff',
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#FEF4D4',
    light: '#FED680',
    main: '#fda92d',
    dark: '#B66816',
    darker: '#793908',
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: 'red',
    lighter: '#FFE3D5',
    light: '#FFC1AC',
    main: '#FF3030',
    dark: '#B71833',
    darker: '#7A0930',
    contrastText: '#fff',
  },
  {
    name: 'pixite',
    lighter: '#EBD6FD',
    light: '#B985F4',
    main: '#7635dc',
    dark: '#431A9E',
    darker: '#200A69',
    contrastText: '#fff',
  },
  {
    name: 'yoh',
    lighter: '#4c4c4c',
    light: '#323232',
    main: '#191919',
    dark: '#000000',
    darker: '#000000',
    contrastText: '#fff',
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];
export const pixitePreset = colorPresets[6];
export const yohPreset = colorPresets[7];

export default function getColorPresets(presetsKey: ThemeColorPresets) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
    pixite: pixitePreset,
    yoh: yohPreset,
  }[presetsKey];
}
