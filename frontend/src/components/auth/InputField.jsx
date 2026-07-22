import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputField({
  icon,
  type = "text",
  placeholder,
  style,
  value,
  onChange,
  showPassword,
  togglePassword,
}) {
  return (
    <div className="relative w-full">

      {/* Left Icon */}

      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        {icon}
      </div>

      {/* Input */}

      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
        w-full
        rounded-xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        py-3.5
        pl-12
        pr-12
        text-white
        placeholder:text-gray-400
        outline-none
        transition-all
        duration-300
        focus:border-cyan-400
        focus:shadow-[0_0_15px_rgba(0,170,255,.35)]
        "
        
      />

      {/* Password Toggle */}

      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          hover:text-white
          transition
          "
          
        >
          {showPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>
      )}

    </div>
  );
}