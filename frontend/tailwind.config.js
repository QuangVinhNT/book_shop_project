/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#8D27AE',
				light: '#EEDFF4',
				lighter: '#FDF8FE',
				lessDark: '#5a1c7a',
				dark: '#380B46',
				lightGray: '#f5f5f5',
				cap: '#09093799',
				customOrange: '#ef6b4a',
				star: '#ff7a01',
				uncoloredStar: '#e7e7e7',
				darkGray: '#03030e66',
				inactiveBar: '#cbcbcb',
				customYellow: '#FFD782'
			},
			boxShadow: {
				roundShadow: '0 0 16px 2px'
			}
		}
	},
	plugins: []
}
