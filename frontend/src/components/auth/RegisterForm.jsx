import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import AuthCard from "./AuthCard";
import { registerUser } from "../../services/auth";
import { getErrorMessage } from "../../services/api";

export default function RegisterForm() {

  const fullNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

const handleRegister = async (e) => {
  e.preventDefault();

  if (loading) return;

  const err = {};

  if (!fullName.trim())
    err.fullName = "Full Name is required";

  if (!username.trim())
    err.username = "Username is required";

  if (!email.trim())
    err.email = "Email is required";

  if (!password.trim())
    err.password = "Password is required";

  if (!confirmPassword.trim()) {
    err.confirmPassword = "Confirm Password is required";
  } else if (password !== confirmPassword) {
    err.confirmPassword = "Passwords do not match";
  }

  setErrors(err);

  if (Object.keys(err).length > 0)
    return;

  setLoading(true);

  try {
    await registerUser({
      username: username.trim(),
      email: email.trim(),
      password,
    });

    alert("Account Created Successfully! Please log in.");

    navigate("/login");
  } catch (error) {
    setErrors({
      form: getErrorMessage(error, "Registration failed."),
    });
  } finally {
    setLoading(false);
  }
};


  return (

    <AuthCard
      title="Create Account"
      subtitle="Join OsteoVision AI"
      className="w-[470px] min-h-[720px] max-w-[92vw]"
      footer={
        <p className="text-center text-gray-400">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      }
    >

      <form onSubmit={handleRegister}>

        {/* Full Name */}
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
            ref={fullNameRef}
            placeholder="Full Name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                usernameRef.current?.focus();
              }
            }}

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={fullName}

            onChange={(e) =>
              setFullName(e.target.value)
            }

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

        {errors.fullName && (
          <p className="text-red-400 text-sm ml-4">
            {errors.fullName}
          </p>
        )}

      </div>

        {/* Username */}

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
            placeholder="Username"

            ref={usernameRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                emailRef.current?.focus();
              }
            }}

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={username}

            onChange={(e) =>
              setUsername(e.target.value)
            }

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

        {errors.username && (
          <p className="text-red-400 text-sm ml-4">
            {errors.username}
          </p>
        )}

        </div>

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                passwordRef.current?.focus();
              }
            }}

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

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

        {errors.email && (
          <p className="text-red-400 text-sm ml-4">
            {errors.email}
          </p>
        )}

        </div>

        {/* Password */}

        <div className="relative" style={{ margin: "1.0rem" }}>
          
          <PasswordInput
            placeholder="Password"

            ref={passwordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                confirmPasswordRef.current?.focus();
              }
            }}

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={password}

            show={showPassword}

            setShow={setShowPassword}

            onChange={(e) =>
              setPassword(e.target.value)
            }

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
          
          {errors.password && (
            <p className="text-red-400 text-sm ml-4">
              {errors.password}
            </p>
          )}

        </div>

        {/* Confirm */}

        <div className="relative" style={{ margin: "1.0rem" }}>

        <PasswordInput
            placeholder="Confirm Password"

            ref={confirmPasswordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleRegister(e);
              }
            }} 

            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}

            value={confirmPassword}

            show={showConfirm}

            setShow={setShowConfirm}

            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }

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
          
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm ml-4">
              {errors.confirmPassword}
            </p>
          )}

        </div>

        {errors.form && (
          <p className="text-red-400 text-sm text-center" style={{ margin: "0.5rem" }}>
            {errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
          w-109
          h-14

          rounded-xl

          font-semibold

          text-white

          bg-gradient-to-r
          from-cyan-500
          via-blue-500
          to-purple-500

          hover:scale-[1.02]

          transition
          "
          style={{ margin: "1.0rem" }}
        >
          {loading ? "Creating account..." : "Create Account"}

        </button>

      </form>

    </AuthCard>

  );
}

function Input({
  icon,
  placeholder,
  type = "text",
}) {

  return (

    <div className="relative">

      <div
        className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
      >
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
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

        placeholder:text-gray-500

        outline-none

        focus:border-cyan-400

        transition
        "
      />

    </div>

  );

}

function PasswordInput({
  placeholder,
  show,
  setShow,
  style,
  value,
  onChange,
}) {

  return (

    <div className="relative">

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
        type={show ? "text" : "password"}
        placeholder={placeholder}
        style={style}
        value={value}
        onChange={onChange}
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

        placeholder:text-gray-500

        outline-none

        focus:border-cyan-400
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
      >
        {show ? <Eye /> : <EyeOff />}
      </button>

    </div>

  );

}










