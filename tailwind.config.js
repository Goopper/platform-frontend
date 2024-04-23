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
                'max': '1440px'
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