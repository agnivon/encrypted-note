import { HTMLMotionProps, motion } from "framer-motion";

type MotionDivMTProps = HTMLMotionProps<"div">;

export default function MotionDivMT(props: MotionDivMTProps) {
  const { children, ...rest } = props;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} {...rest}>
      {children}
    </motion.div>
  );
}
