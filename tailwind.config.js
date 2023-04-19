/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				orange: {
					300: '#FBD38D'
				}
			}
		}
	},
	plugins: [
		require('tailwind-scrollbar')({
			scrollbarWidth: 'thin',
			trackBorderColor: 'transparent',
			thumbColor: 'gray-400',
			trackColor: 'gray-100'
		})
	]
};
