module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend:{
      fontFamily: {
        'myeongjo': ["Nanum Myeongjo"],
        'times':["times"]
      },
      letterSpacing: {
        tightest:'-.075em'
      },
      colors: {
        'primary':{
          50:'#EEF9F8',
          100:'#CDF3F1',
          200:'#9CE8E3',
          300:'#11DACE',
          400:'#00BCB1',
          500:'#009E95',
          600:'#007D76',
          700:'#005A55',
          800:'#00403C',
          900:'#002624'
        }
      }
    },

  },
  plugins: []
}
