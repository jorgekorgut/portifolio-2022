import { motion } from "framer-motion";
const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const Transitions = ({ children, className }) => {
    return (
        <motion.div className={className}
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.25 }}
        >
            {children}
        </motion.div>
    );
};
export default Transitions;
