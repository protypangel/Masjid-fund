/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				mosque: {
					green: '#0d6b4d',
					gold: '#c6a15b',
					dark: '#0b132b',
					light: '#f8faf9',
				},
			},
			fontFamily: {
				display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
			},
			boxShadow: {
				soft: '0 10px 30px rgba(0,0,0,0.08)'
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio')
	]
}; 