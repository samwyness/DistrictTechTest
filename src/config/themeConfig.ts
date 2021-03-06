import { Dict } from 'native-base/lib/typescript/theme/tools';
import { Appearance } from 'react-native';

const colors = {
  brand: {
    primary: '#43a047',
    light: '#76d275',
    dark: '#00701a',
    opaque: 'rgba(67, 160, 71, 0.5)',
  },
};

// Default button styles
// Dark/Light styles matching current Color Scheme
function buttonDefault(props: Dict) {
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  let bg = isDarkMode ? 'dark.700' : 'dark.50';

  if (props.isDisabled) {
    bg = isDarkMode ? 'dark.500' : 'dark.300';
  }

  return {
    _web: {
      outlineWidth: 0,
    },
    bg,
    _pressed: {
      bg: isDarkMode ? 'dark.600' : 'dark.200',
    },
  };
}

// Brand button styles
function buttonBrand(props: Dict) {
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  let bg = 'brand.primary';

  if (props.isDisabled) {
    bg = isDarkMode ? 'dark.500' : 'dark.300';
  }

  return {
    _web: {
      outlineWidth: 0,
    },
    bg,
    _pressed: {
      bg: 'brand.light',
    },
  };
}

export const themeConfig = {
  config: {
    useSystemColorMode: true,
  },

  colors,

  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
      },
      defaultProps: {
        variant: 'default',
        colorScheme: 'default',
      },
      variants: {
        default: buttonDefault,
        brand: buttonBrand,
      },
    },
  },
};
