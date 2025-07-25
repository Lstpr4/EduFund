tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#3b82f6',
                'secondary': '#6366f1',
                'accent': '#10b981'
            },
            fontFamily: {
                'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
                'display': ['Montserrat', 'ui-sans-serif', 'system-ui'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}