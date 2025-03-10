const questionVariants = {
  hidden: {
    opacity: 0,
    y: 0,
    scale: 0.1,
    transition: {
      duration: 0.2,
    },
  },
  exiting: {
    opacity: 0,
    y: -40,
    scale: 0.1,
    transition: {
      duration: 0.2,
    },
  },
  black: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
    scale: 1,
  },
};

export { questionVariants };

const sidebarVariants = {
  open: (height = 1000) => ({
    // clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      delay: 1,
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    // clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export { sidebarVariants };

const areaItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    // scale: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    // scale: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export { areaItemVariants };
const areaItemSelectedVariants = {
  open: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    scale: 1,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export { areaItemSelectedVariants };
const glowingVariants = {
  initial: {
    // backgroundColor: '#cc0000', // Red main color
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  pulsing: {
    // backgroundColor: '#cc0000', // Lighter red for the pulse
    scale: [1, 1.1, 1], // Scale up and down to create the pulse effect
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};
export { glowingVariants };

const dashboardVariants = {
  hidden: {
    opacity: 0,
    y: 0,
    scale: 0.1,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // delay: animationDelay,
      duration: 0.2,
    },
    scale: 1,
  },
};
export { dashboardVariants };
