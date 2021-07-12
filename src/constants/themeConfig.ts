export const themeConfig = {
  config: {
    useSystemColorMode: true,
  },

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
