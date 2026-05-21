export const imageReveal = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
    },
};

export const imageRevealVariants = {
    hidden: imageReveal.initial,
    visible: {
        ...imageReveal.whileInView,
        transition: imageReveal.transition,
    },
};
