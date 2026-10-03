import {loadFont as loadPoppins} from '@remotion/google-fonts/Poppins';
import {loadFont as loadCairo} from '@remotion/google-fonts/Cairo';

// Load only the weights we use to keep renders fast.
const poppins = loadPoppins('normal', {weights: ['700', '800'], subsets: ['latin']});
const cairo = loadCairo('normal', {weights: ['700', '800'], subsets: ['arabic', 'latin']});

export const fonts = {
  latin: poppins.fontFamily,
  arabic: cairo.fontFamily,
} as const;

export type Script = 'latin' | 'arabic';

export const fontFor = (script: Script = 'latin') =>
  script === 'arabic' ? fonts.arabic : fonts.latin;
