/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        mainColorDark: '#121212',
        mainColorLight: '#F6F4F4',
        textColorDark: '#E0E0E0',
        textColorLight: '#212121',
        secondaryColorDark: '#1E1E1E',
        secondaryColorLight: '#D2D2E3',
        addTaskButtonColorDark: '#555B6E',
        addTaskButtonColorLight: '#A6A8BF',
        timerAlertMainDark: '#334155',
        timerAlertMainLight: '#E2E8F0',
        timerAlertTextDark: '#E5E7EB',
        timerAlertTextLight: '#1E293B',
        timerAlertBorderDark: '#475569',
        timerAlertBorderLight: '#CBD5E1',
      },
      fontFamily: {
        'sans': ['Work Sans', 'Arial', 'Helvetica', 'Sans-serif']
      },
    },  
  },
  plugins: [],
}
