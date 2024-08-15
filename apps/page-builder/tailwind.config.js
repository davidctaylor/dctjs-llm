const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'common-primary': {
          DEFAULT: '#7e57c2', // #5e35b1',
        },
      },
      transitionProperty: {
        'height': 'height'
      }
    },
    fontFamily: {
      sans: ['Montserrat'],
    },
  },
  plugins: [],
};
