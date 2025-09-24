import { extendTheme } from '@chakra-ui/react';

// Foundations
import colors from './foundations/colors';
import typography from './foundations/typography';
import shadows from './foundations/shadows';
import radii from './foundations/radii';

// Semantic tokens
import semanticTokens from './semantic-tokens';

// Component customizations
import Button from './components/button';
import Card from './components/card';
import Container from './components/container';
import Heading from './components/heading';
import Input from './components/input';
import Link from './components/link';
import Select from './components/select';

const theme = extendTheme({
  // ✅ UPDATED: Set blue as primary color scheme
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  
  // ✅ NEW: Default color scheme is now blue
  colors: {
    ...colors,
    // Override Chakra's default blue with our corporate blue
    primary: colors.blue,
  },
  
  fonts: typography.fonts,
  fontSizes: typography.fontSizes,
  fontWeights: typography.fontWeights,
  lineHeights: typography.lineHeights,
  
  radii,
  shadows,
  semanticTokens,
  
  // ✅ UPDATED: Component overrides with blue theme
  components: {
    Button: {
      ...Button,
      defaultProps: {
        colorScheme: 'blue', // Default buttons are now blue
      },
    },
    Card,
    Container,
    Heading,
    Input,
    Link,
    Select,
  },
  
  // ✅ NEW: Global styles with corporate feel
  styles: {
    global: {
      body: {
        bg: 'slate.50',
        color: 'slate.900',
      },
      '*::placeholder': {
        color: 'slate.400',
      },
      '*, *::before, &::after': {
        borderColor: 'slate.200',
      },
    },
  },
});

export default theme;