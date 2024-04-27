/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                '52': 'repeat(52, minmax(0, 1fr))'
            }
        },
        screens: {
            'sm': {
                'max': '768px'
            },
            'md': {
                'max': '1280px'
            },
            'lg': {
                'min': '1281px',
                'max': '1440px'
            },
            '2lg': {
                'max': '1680px'
            },
            'bsm': {
                'min': '769px'
            },
            'bmd': {
                'min': '1281px'
            },
            'blg': {
                'min': '1441px'
            }
        }
    },
    plugins: [],
};