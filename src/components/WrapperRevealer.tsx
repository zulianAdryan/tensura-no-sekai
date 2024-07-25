import { useInView } from "framer-motion";
import { ReactElement, useRef } from "react";
import { motion } from "framer-motion";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const WrapperRevealer = ({
  className,
  children,
}: {
  className?: ClassValue;
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  //   console.log("isInView", isInView);

  return (
    <motion.section
      className={cn("bg-black", className)}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.section>
  );
};

export default WrapperRevealer;
