import { User } from "lucide-react";
import logo from "../../assets/logo/logo.png";

export default function MessageBubble({ role = "assistant", text = "" }) {
  const isUser = role === "user";

  return (
    <div
      className={`
      flex

      gap-3

      ${isUser ? "flex-row-reverse" : "flex-row"}
      `}
    >

      <div
        className="
        w-9

        h-9

        rounded-full

        flex

        items-center

        justify-center

        shrink-0

        overflow-hidden

        bg-gradient-to-r

        from-cyan-500

        to-blue-500
        "
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <img
            src={logo}
            alt="OsteoVision"
            className="w-full h-full object-contain p-1"
          />
        )}
      </div>

      <div
        className={`
        max-w-xl

        rounded-2xl

        px-5

        py-3

        text-sm

        leading-6

        ${
          isUser
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            : "bg-white/[0.05] border border-cyan-500/10 text-gray-200"
        }
        `}
      >
        {text}
      </div>

    </div>
  );
}