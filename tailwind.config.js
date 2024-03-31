/** @type {import('tailwindcss').Config} */

export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				auth: 'url(/overlays/bg__auth.svg)',
				interior: 'url(/overlays/bg__interior.svg)',
			},
			borderWidth: {
				3: '3px',
				6: '6px',
			},
			colors: {
				supernova: '#fac900' /* yellow / warning */,
				spicyMustard: '#6e5a0d' /* dark yellow */,
				bombay: '#aeaeae' /* light gray */,
				orangeRed: '#ff4600' /* red / error */,
				cognac: '#9a360e' /* dark red */,
				fireEngineRed: '#c52425' /* dark red */,
				silverTree: '#70bd91' /* light green */,
				turquoiseGreen: '#a0ccb7' /* very light green */,
				spanishGreen: '#008a52' /* medium green */,
				cruseo: '#0a5d2c' /* dark green */,
				countyGreen: '#003d19' /* darkest green */,
				acadia: '#392f2d' /* brown */,
				scotchMist: '#efe9cb' /* light brown */,
				nileBlue: '#243853' /* blue */,
				blackPearl: '#071126' /* navy blue */,
				pastelMagenta: '#ff9dbf' /* pink */,
				padua: '#b1e3cc' /* lightest green - placeholder color */,
				vistaBlue: '#94d1b4' /* light green - placeholder color */,
			},
			width: {
				436: '436px',
				416: '416px',
			},
			zIndex: {
				999: 999,
				9999: 9999,
			},
		},
		fontFamily: {
			condensed: ['Bebas Neue', 'sans-serif'],
			handwriting: ['Kalam', 'cursive'],
			sans: ['Inter', 'sans-serif'],
			script: ['Agbalumo', 'cursive'],
		},
	},
	plugins: [require('tailwind-scrollbar'), require('@tailwindcss/container-queries')],
};
