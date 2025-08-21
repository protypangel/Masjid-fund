/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#209268',
				'primary-foreground': '#FFFFFF',
				'primary-light': '#E1F4ED',
				secondary: '#F0C238',
				'secondary-foreground': '#1B2232',
				'secondary-light': '#FDFBE7',
				accent: '#23365C',
				'accent-foreground': '#FFFFFF',
				'accent-light': '#EDF0FB',
				background: '#FDFDFC',
				foreground: '#1B2232',
				muted: '#F3F4F6',
				'muted-foreground': '#626D84',
				border: '#ff0000',
				destructive: '#E23636',
				'destructive-foreground': '#FFFFFF',
				input: '#EDEFF2',
				'slider-background': '#FAFAFA',
				header: '#FDFDFC',
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