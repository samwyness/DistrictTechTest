import { useTheme } from 'native-base';
import { ColorSchemeName, useColorScheme } from 'react-native';

type ThemeSettings = {
  colorScheme: ColorSchemeName;
  isDarkMode: boolean;
  statusBarStyle: 'light-content' | 'dark-content';
  backgroundColor: string;
  textColor: string;
};

export const useThemeSettings = (): ThemeSettings => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';
  const statusBarScheme = isDarkMode ? 'light-content' : 'dark-content';

  return {
    colorScheme,
    isDarkMode,
    statusBarStyle: statusBarScheme,
    backgroundColor: isDarkMode ? theme.colors.black : theme.colors.white,
    textColor: isDarkMode ? theme.colors.dark[600] : theme.colors.darkText,
  };
};
