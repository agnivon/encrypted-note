export const fade = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const fadeO = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

export const fadeAndSlideUp = {
  visible: { opacity: 1, y: 0 },
  hidden: (y = -100) => ({ opacity: 0, y: -y }),
};
