import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo/logo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = {
    name: "Pardhiva Reddy",
  };

  const [showModels, setShowModels] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const recentChats = [
    {
      title: "Explain Osteosarcoma",
      time: "Today",
    },
    {
      title: "MRI Bone Scan",
      time: "Today",
    },
    {
      title: "Upload X-Ray",
      time: "Yesterday",
    },
    {
      title: "Bone Tumor Detection",
      time: "Yesterday",
    },
    {
      title: "Confidence Report",
      time: "2 days ago",
    },
    {
      title: "Stage Prediction",
      time: "2 days ago",
    },
    {
      title: "Medical Report",
      time: "3 days ago",
    },
    {
      title: "CT Scan Analysis",
      time: "3 days ago",
    },
    {
      title: "Deep Learning Result",
      time: "4 days ago",
    },
    {
      title: "Patient Report",
      time: "5 days ago",
    },
    {
      title: "Prediction History",
      time: "Last Week",
    },
    {
      title: "OsteoVision Demo",
      time: "Last Week",
    },
  ];

  return (
    <motion.div
      initial={{ x: -25, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="
      h-screen
      w-full

      bg-[#070B17]/75

      backdrop-blur-2xl

      border-r
      border-cyan-500/10

      flex
      flex-col
      "
    >
      {/* Logo */}

      <div className="px-6 pt-6">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="OsteoVision"
            className="w-14 h-14 object-contain"
          />

          <div>

            <h1
              className="
              text-white

              tracking-[3px]

              font-light

              text-lg
              "
            >
              OSTEO VISION
            </h1>

          </div>

        </div>

      </div>

      {/* New Chat */}

      <div className="px-6 mt-8" style={{margin:"1rem"}}>

        <button
          className="
          w-full

          h-14

          rounded-2xl

          border
          border-cyan-500/15

          bg-white/[0.03]

          hover:bg-cyan-500/10

          transition-all

          flex

          items-center

          gap-3

          px-5

          text-white
          "
        >
          <Plus size={20} />

          <span className="font-medium">
            New Chat
          </span>

        </button>

      </div>

      {/* Scrollable Recent Chats */}

      <div
        className="
        flex-1

        mt-8

        overflow-y-auto

        custom-scrollbar

        px-6
        "
        style={{margin:"1rem"}}
      >

        <p
          className="
          text-gray-400

          text-sm

          mb-4
          "
        >
          Recent Chats
        </p>

        <div className="space-y-2" style={{margin:"0.5rem"}}>

          {recentChats.map((chat, index) => (

            <button
              key={index}
              className="
              w-full

              rounded-xl

              p-3

              hover:bg-white/5

              transition-all

              text-left

              flex

              justify-between

              items-start
              "
            >

              <div className="flex gap-3" style={{margin:"0.6rem"}}>

                <MessageSquare
                  size={16}
                  className="mt-1 text-gray-500"
                />

                <div>

                  <p
                    className="
                    text-gray-300

                    text-sm

                    line-clamp-1
                    "
                  >
                    {chat.title}
                  </p>

                </div>

              </div>

              <span
                className="
                text-xs

                text-gray-500

                ml-3

                whitespace-nowrap
                "
              >
                {chat.time}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* Profile */}

      <div
        className="
        px-6

        py-5

        rounded-2xl

        border
        border-cyan-500/15

        relative
        "
        style={{margin:"0.7rem"}}
      >
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="
          w-full

          flex

          items-center

          justify-between

          rounded-2xl

          p-3

          hover:bg-white/5

          transition-all
          "
        >
          <div className="flex items-center gap-3" style={{margin:"0.3rem"}}>
            <div
              className="
              w-9
              h-9

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

            <div className="text-left" style={{margin:"0.3rem"}}>
              <p className="text-white text-sm font-medium">
                Pardhiva Reddy
              </p>

              <p className="text-gray-500 text-xs">
                Free Plan
              </p>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={`
              text-gray-400
              transition-transform
              ${showProfile ? "rotate-180" : ""}
            `}
          />
        </button>

        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="
              absolute

              bottom-20

              left-6

              right-6

              rounded-xl

              overflow-hidden

              border
              border-cyan-500/10

              bg-[#111827]

              backdrop-blur-xl

              shadow-2xl
              "
            >
              <div className="px-4 py-4" style={{margin:"0.3rem"}}>
                <div className="flex items-center gap-3">
                  <User
                    size={18}
                    className="text-cyan-400"
                  />

                  <div>
                    <p className="text-white font-medium">
                      {user.name}
                    </p>

                    <p className="text-gray-500 text-xs">
                      AI User
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              <button
                onClick={() => navigate("/login")}
                className="
                w-full

                px-4
                py-4

                flex

                items-center

                gap-3

                text-red-400

                hover:bg-red-500/10

                transition-all
                "
                style={{margin:"0.7rem"}}
              >
                <LogOut size={18} />

                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}