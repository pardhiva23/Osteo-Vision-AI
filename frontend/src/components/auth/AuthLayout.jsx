import { motion } from "framer-motion";
import background from "../../assets/images/login-bg.png";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}

      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />

      {/* Center */}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          {children}
        </motion.div>

      </div>

    </div>
  );
}