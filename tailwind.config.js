// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  important: '.ion-page',
  theme: {
    screens: {
      'sm': '350px',
      'md': '400px',
      'lg': '600px',
      'xl': '890px'
    },
    extend: {
      spacing: {
        '11': '2.75rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '18': '4.5rem',
        '28': '7rem'
      },
      minWidth: {
        '1/4': '25%',
        '1/5': '20%',
        '1/6': '16.66%',
        '1/2': '50%',
        '3/4': '75%'
      },
      height: {
        '60': '15rem',
        '72': '18rem',
        '88': '22rem',
        '1/2': '50%',
        '3/4': '75%'
      }
    }
  },
  variants: {
    padding: ['responsive', 'ios'],
    margin: ['responsive', 'ios'],
    height: ['responsive', 'ios'],
    display: ['responsive', 'ios']
  },
  plugins: [
    plugin(function ({addVariant, e}) {
      addVariant('ios', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.ios .${e(`ios${separator}${className}`)}`
        })
      })
    }),
    plugin(function ({addVariant, e}) {
      addVariant('md', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${e(`md${separator}${className}`)}`
        })
      })
    })
  ]
}
