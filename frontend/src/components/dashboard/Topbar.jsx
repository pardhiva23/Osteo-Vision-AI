import { useState, useRef, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      className="
      h-20

      px-8

      border-b
      border-cyan-500/10

      bg-[#0A1020]/45

      backdrop-blur-xl

      flex

      items-center

      justify-between
      "
    >
      {/* Left */}

      <div>

        <h1
          className="
          text-white

          text-2xl

          font-semibold
          "
        >
          Osteo
          <span className="text-cyan-400">
            Vision AI
          </span>
        </h1>

      </div>

      {/* Right */}

      <div
        className="relative"
        ref={dropdownRef}
      >

        <button
          onClick={() => setOpen(!open)}
          className="
          flex

          items-center

          gap-3

          px-4

          py-2

          rounded-xl

          hover:bg-white/5

          transition
          "
        >

          <div
            className="
            w-11

            h-11

            rounded-full

            bg-gradient-to-r

            from-cyan-500

            to-blue-500

            flex

            items-center

            justify-center

            text-white

            font-semibold
            "
          >
            P
          </div>

          <div className="text-left">

            <p className="text-white font-medium">
              Pardhiva Reddy
            </p>

            <p className="text-gray-400 text-xs">
              Student
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-gray-400"
          />

        </button>

        <AnimatePresence>

          {open && (

            <motion.div

              initial={{
                opacity: 0,
                y: -8,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -8,
              }}

              transition={{
                duration: 0.2,
              }}

              className="
              absolute

              right-0

              mt-3

              w-64

              rounded-2xl

              border
              border-cyan-500/10

              bg-[#111827]/95

              backdrop-blur-2xl

              shadow-2xl

              overflow-hidden
              "
            >

              <div className="p-5">

                <div className="flex items-center gap-3">

                  <div
                    className="
                    w-12

                    h-12

                    rounded-full

                    bg-gradient-to-r

                    from-cyan-500

                    to-blue-500

                    flex

                    items-center

                    justify-center
                    "
                  >
                    <User
                      size={20}
                      className="text-white"
                    />
                  </div>

                  <div>

                    <p className="text-white font-semibold">
                      Pardhiva Reddy
                    </p>

                    <p className="text-gray-400 text-sm">
                      AI Student
                    </p>

                  </div>

                </div>

              </div>

              <div className="border-t border-white/10" />

              <button

                onClick={() => navigate("/login")}

                className="
                w-full

                text-left

                px-5

                py-4

                text-red-400

                hover:bg-red-500/10

                transition
                "
              >
                Logout
              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </div>
  );
}