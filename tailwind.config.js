/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        screens: {
            'sm': {
                'max': '768px'
            }
        }
    },
    plugins: [],
};