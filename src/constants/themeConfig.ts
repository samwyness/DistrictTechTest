
const colors = {
  brand: {
    primary: '#f54b5e',
    light: '#ff808b',
    dark: '#bc0035',
  },
};

export const themeConfig = {
  config: {
    useSystemColorMode: true,
  },

  colors,

  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
        _text: {
          textTransform: 'uppercase',
        },
      },
    },
  },
};
