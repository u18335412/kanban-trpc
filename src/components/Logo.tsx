import { FC, useEffect, useState } from 'react';
import useTheme from '~/data/useTheme';
const themeImages = ['/assets/logo-light.svg', '/assets/logo-dark.svg'];
const Logo: FC = () => {
  const [themeImage, setThemeImage] = useState<string>(themeImages[0] || '');
  const { theme } = useTheme();
  useEffect(() => {
    theme === 'dark'
      ? setThemeImage(themeImages[0] || '')
      : setThemeImage(themeImages[1] || '');
  }, [theme]);

  return <img src={themeImage} alt="logo light" />;
};

export default Logo;
