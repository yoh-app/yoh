import { motion, AnimateSharedLayout } from 'framer-motion';
import { fadeInOut } from '@utils/motion/fade-in-out';
const FadeInOutLayout = ({ children, className, style }) => {
  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        variants={fadeInOut(0.8)}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default FadeInOutLayout;
