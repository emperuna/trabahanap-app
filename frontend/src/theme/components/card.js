const Card = {
  baseStyle: {
    bg: 'white',
    borderRadius: 'xl',
    border: '1px solid',
    borderColor: 'gray.200',
    boxShadow: 'subtle',
    _dark: {
      bg: 'gray.800',
      borderColor: 'whiteAlpha.200'
    }
  },
  variants: {
    glass: {
      bg: 'whiteAlpha.100',
      backdropFilter: 'blur(20px)',
      borderColor: 'whiteAlpha.300',
      boxShadow: 'glow'
    },
    elevated: {
      boxShadow: 'elevated'
    }
  }
};
export default Card;