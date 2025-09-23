const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'xl',
    transition: 'all 0.2s ease',
    _focus: {
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)', // Blue focus ring
    },
  },
  
  sizes: {
    sm: {
      h: 8,
      px: 3,
      fontSize: 'sm',
    },
    md: {
      h: 10,
      px: 4,
      fontSize: 'md',
    },
    lg: {
      h: 12,
      px: 6,
      fontSize: 'lg',
    },
  },
  
  variants: {
    solid: {
      bg: 'blue.500', // ✅ CHANGED: Default solid is blue
      color: 'white',
      _hover: {
        bg: 'blue.600',
        transform: 'translateY(-1px)',
        boxShadow: 'lg',
      },
      _active: {
        bg: 'blue.700',
        transform: 'translateY(0)',
      },
    },
    
    outline: {
      border: '2px solid',
      borderColor: 'blue.500', // ✅ CHANGED: Blue borders
      color: 'blue.500',
      _hover: {
        bg: 'blue.50',
        borderColor: 'blue.600',
        color: 'blue.600',
      },
    },
    
    ghost: {
      color: 'blue.500', // ✅ CHANGED: Blue text
      _hover: {
        bg: 'blue.50',
        color: 'blue.600',
      },
    },
    
    // ✅ NEW: Corporate variant
    corporate: {
      bg: 'linear-gradient(135deg, blue.500, blue.600)',
      color: 'white',
      _hover: {
        bg: 'linear-gradient(135deg, blue.600, blue.700)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
      },
    },
  },
  
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'blue', // ✅ CHANGED: Default is blue
  },
};

export default Button;