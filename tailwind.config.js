/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      lg: { max: '1999.99px'},
      md: {max: '991.99px'},
      sm: {max: '767.99px'},
      xs: {max: '479.99px'}
    },
    extend: {
      transitionProperty:{
        height: 'height'
      },

      colors: {
        accentPurple: '#725FEB',
        accentPurpleActive: '#5c49d2',
        textDefault: '#333'

      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(135deg,#846170,#70929c)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
