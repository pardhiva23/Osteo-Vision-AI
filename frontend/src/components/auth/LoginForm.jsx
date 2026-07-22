import { useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";

import AuthCard from "./AuthCard";

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
    
    navigate("/dashboard");
    // TODO:
    // Call Login API
  };

  return (
    <AuthCard
      title="Osteo Vision"
      subtitle="AI Powered Osteosarcoma Assistant"
      footer={
        <p className="text-center text-gray-400">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-cyan-400 hover:text-cyan-300"
          >
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin}>

        {/* Email */}

        <div className="relative" style={{ margin: "1.0rem" }}>

          <User
            size={20}
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type="email"
            placeholder="Email"
            ref={emailRef}

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            onKeyDown={(e) => {
              if (e.key === "Enter"){
                e.preventDefault();
                passwordRef.current?.focus();
              }
            }}

            className="
            w-full
            h-14

            rounded-xl

            bg-[#151B30]/70

            border
            border-cyan-500/10

            pl-14
            pr-5

            text-white

            outline-none

            placeholder:text-gray-500

            focus:border-cyan-400

            focus:shadow-[0_0_15px_rgba(0,180,255,.25)]

            transition
            "
          />

        </div>

        {/* Password */}

        <div className="relative" style={{ margin: "1.0rem" }}>

          <Lock
            size={20}
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }

            ref={passwordRef}

            placeholder="Password"

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            onKeyDown={(e) => {
              if (e.key === "Enter"){
                e.preventDefault();
                handleLogin(e);
              }
            }}

            className="
            w-full
            h-14

            rounded-xl

            bg-[#151B30]/70

            border
            border-cyan-500/10

            pl-14
            pr-14

            text-white

            outline-none

            placeholder:text-gray-500

            focus:border-cyan-400

            focus:shadow-[0_0_15px_rgba(0,180,255,.25)]

            transition
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2

            text-gray-400

            hover:text-white
            "
          >
            {showPassword
              ? <Eye />
              : <EyeOff />}
          </button>

        </div>

        {/* Forgot */}

        <div className="flex justify-end mt-3" style={{ marginRight: "0.4rem" }}>

          <Link
            to="/forgot-password"
            className="
            text-sm

            text-cyan-400

            hover:text-cyan-300
            "
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}

        <button
          type="submit"
          className="
          w-110

          h-14

          mt-8

          rounded-xl

          bg-gradient-to-r

          from-cyan-500

          via-blue-500

          to-purple-500

          text-white

          font-semibold

          hover:scale-[1.02]

          transition
          "
          style={{ margin: "1.0rem" }}
        >
          Login
        </button>

      </form>
    </AuthCard>
  );
}