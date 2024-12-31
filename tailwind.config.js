/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			purple: {
				100: '#E9D8FD',
				200: '#D6BCFA',
				300: '#B794F4',
				400: '#A05EB1',
				500: '#805AD5',
				600: '#6B46C1', // purple-600
				700: '#553C9A',
				800: '#443A99',
				900: '#322659',
			  },
			  blue: {
				100: '#EBF8FF',
				200: '#BEE3F8',
				300: '#90CDF4',
				400: '#63B3ED',
				500: '#4299E1', // blue-500
				600: '#3182CE',
				700: '#2B6CB0',
				800: '#2C5282',
				900: '#1A365D',
			  },
			  green: {
				100: '#F0FFF4',
				200: '#C6F6D5',
				300: '#9AE6B4',
				400: '#68D391',
				500: '#48BB78', // green-500
				600: '#38A169',
				700: '#2F855A',
				800: '#276749',
				900: '#22543D',
			  },
			  red: {
				100: '#FFF5F5',
				200: '#FED7D7',
				300: '#FEB2B2',
				400: '#FC8181',
				500: '#F56565', // red-500
				600: '#E53E3E',
				700: '#C53030',
				800: '#9B2C2C',
				900: '#742A2A',
			  },
			  yellow: {
				100: '#FFFFF0',
				200: '#FEFCBF',
				300: '#FAF089',
				400: '#F6E05E',
				500: '#ECC94B', // yellow-500
				600: '#D69E2E',
				700: '#B7791F',
				800: '#975A16',
				900: '#744210',
			  },
			  orange: {
				100: '#FFF8E1',
				200: '#FFEDCC',
				300: '#FFD29E',
				400: '#FFB84D',
				500: '#FFA300', // orange-500
				600: '#FF8C00',
				700: '#DB6E00',
				800: '#A95C00',
				900: '#7D4A00',
			  },
			  teal: {
				100: '#E6FFFA',
				200: '#B2F5EA',
				300: '#81E6D9',
				400: '#4FD1C5',
				500: '#38B2A5', // teal-500
				600: '#319795',
				700: '#2C7A7F',
				800: '#285E61',
				900: '#234E52',
			  },
			  gray: {
				100: '#F7FAFC',
				200: '#EDF2F7',
				300: '#E2E8F0',
				400: '#CBD5E0',
				500: '#A0AEC0', // gray-500
				600: '#718096',
				700: '#4A5568',
				800: '#2D3748',
				900: '#1A202C',
			  },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
