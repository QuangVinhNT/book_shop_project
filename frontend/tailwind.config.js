/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#8D27AE',
				light: '#EEDFF4',
				dark: '#380B46',
				lightGray: '#f5f5f5',
				cap: '#09093799',
				customOrange: '#ef6b4a'
			}
		}
	},
	plugins: []
}
