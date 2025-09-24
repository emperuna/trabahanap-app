const semanticTokens = {
  colors: {
    // Background semantic tokens
    'bg.canvas': {
      default: 'white',
      _dark: 'gray.900',
    },
    'bg.surface': {
      default: 'gray.50',
      _dark: 'gray.800',
    },
    'bg.glass': {
      default: 'rgba(255, 255, 255, 0.95)',
      _dark: 'rgba(17, 24, 39, 0.95)',
    },
    'bg.card': {
      default: 'white',
      _dark: 'gray.800',
    },

    // Text semantic tokens
    'text.primary': {
      default: 'gray.900',
      _dark: 'gray.100',
    },
    'text.secondary': {
      default: 'gray.600',
      _dark: 'gray.400',
    },
    'text.muted': {
      default: 'gray.500',
      _dark: 'gray.500',
    },

    // Border semantic tokens
    'border.subtle': {
      default: 'gray.200',
      _dark: 'gray.700',
    },
    'border.accent': {
      default: 'blue.200',
      _dark: 'blue.700',
    },
  },
};

export default semanticTokens;