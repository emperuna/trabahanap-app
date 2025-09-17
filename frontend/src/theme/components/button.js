const Button = {
  baseStyle: {
    fontWeight: '600',
    borderRadius: 'xl',
    transition: 'all 0.2s ease',
    _focus: {
      boxShadow: 'none',
    },
  },
  variants: {
    // Primary gradient button
    primaryGradient: {
      bgGradient: 'linear(135deg, purple.500, blue.500)',
      color: 'white',
      _hover: {
        bgGradient: 'linear(135deg, purple.600, blue.600)',
        transform: 'translateY(-2px)',
        boxShadow: 'xl',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    
    // Glass effect button
    glass: {
      bg: 'bg.glass',
      backdropFilter: 'blur(20px)',
      border: '1px solid',
      borderColor: 'border.subtle',
      color: 'text.primary',
      _hover: {
        bg: 'whiteAlpha.200',
        borderColor: 'border.accent',
      },
    },
    
    // Modern ghost
    modernGhost: {
      bg: 'transparent',
      color: 'text.secondary',
      _hover: {
        bg: 'bg.surface',
        color: 'text.primary',
        transform: 'translateY(-1px)',
      },
    },
  },
  sizes: {
    lg: {
      h: 12,
      px: 8,
      fontSize: 'md',
    },
    xl: {
      h: 14,
      px: 10,
      fontSize: 'lg',
    },
  },
};

export default Button;