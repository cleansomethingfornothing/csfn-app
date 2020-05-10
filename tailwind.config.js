// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    screens: {
      'sm': '350px',
      'md': '400px',
      'lg': '600px',
      'xl': '890px'
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/5': '20%',
      '1/6': '16.66%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    height: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '88': '22rem',
      '1/2': '50%',
      '3/4': '75%',
      'auto': 'auto',
      'px': '1px',
      'full': '100%',
      'h-screen': '100vh'
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
