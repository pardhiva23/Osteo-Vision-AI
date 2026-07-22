import { motion } from "framer-motion";
import logo from "../../assets/logo/logo.png";

export default function AuthCard({
    title,
    subtitle,
    children,
    footer,
    className=""
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
                relative
                z-10

                w-[470px]
                max-w-[92vw]
                min-h-[510px]

                rounded-[34px]

                border
                border-cyan-400/15

                bg-[linear-gradient(135deg,rgba(16,22,38,.82),rgba(22,18,42,.72))]

                backdrop-blur-[30px]

                shadow-[0_30px_80px_rgba(0,0,0,.55)]

                px-10
                py-8
            "
        >

            {/* Logo */}

            <div className="flex justify-center" style={{ margin: "0.4rem" }}>

                <img
                    src={logo}
                    alt="OsteoVision"
                    className="w-24 h-24 object-contain"
                    draggable={false}
                />

            </div>

            {/* Heading */}

            <h1 className="text-center text-[46px] font-bold leading-none">

                <span className="text-white">
                    {title.split(" ")[0]}
                </span>

                {" "}

                <span className="text-cyan-400">
                    {title.split(" ").slice(1).join(" ")}
                </span>

            </h1>

            {/* Subtitle */}

            <p className="text-center text-gray-400 mt-2 mb-8">

                {subtitle}

            </p>

            {/* Form */}

            {children}

            {/* Footer */}

            {footer && (

                <div className="mt-8">

                    {footer}

                </div>

            )}

        </motion.div>
    );
}