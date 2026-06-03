import { motion } from "framer-motion";

export default function ScrollAnimation({
    children,
    direction = "up",
    delay = 0,
}) {

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : -50,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                delay,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: false,
                amount: 0.2,
            }}
        >
            {children}
        </motion.div>
    );
}