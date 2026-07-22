import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({
  name = "Pardhiva Reddy",
  role = "Student",
}) {
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

  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{
              opacity: 0,
              y: 8,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: 8,
            }}

            transition={{
              duration: 0.2,
            }}

            className="
            absolute

            bottom-full

            left-0

            mb-3

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
                    {name}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {role}
                  </p>

                </div>

              </div>

            </div>

            <div className="border-t border-white/10" />

            <button

              onClick={() => navigate("/login")}

              className="
              w-full

              flex

              items-center

              gap-2

              text-left

              px-5

              py-4

              text-red-400

              hover:bg-red-500/10

              transition
              "
            >
              <LogOut size={16} />
              Logout
            </button>

          </motion.div>

        )}

      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="
        w-full

        flex

        items-center

        gap-3

        px-2

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

          shrink-0
          "
        >
          {initial}
        </div>

        <div className="text-left flex-1 min-w-0">

          <p className="text-white font-medium truncate">
            {name}
          </p>

        </div>

        <ChevronDown
          size={18}
          className="text-gray-400 shrink-0"
        />

      </button>

    </div>
  );
}