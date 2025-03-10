export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 0,
    scale: 0.1,
    transition: {
      duration: 1,
    },
  },
  exiting: {
    opacity: 0,
    y: -40,
    scale: 0.1,
    transition: {
      duration: 1,
    },
  },
  black: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
    scale: 1,
  },
};
