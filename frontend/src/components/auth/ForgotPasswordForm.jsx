import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthCard from "./AuthCard";
import { useRef, useState } from "react";

export default function ForgotPasswordForm() {
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    navigate("/otp");

};

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your registered email to receive an OTP."
      footer={
        <p className="text-center text-gray-400">
          Remember your password?

          <Link
            to="/login"
            className="ml-2 text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="relative" style={{ margin: "1.0rem" }}>

          <Mail
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
            placeholder="Email Address"
            ref={emailRef}
            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter"){
                e.preventDefault();
                handleSubmit(e);
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

            placeholder:text-gray-500

            outline-none

            focus:border-cyan-400
            "
          />

        </div>

        <button
          className="
          w-110
          h-14

          rounded-xl

          font-semibold

          text-white

          bg-gradient-to-r

          from-cyan-500
          via-blue-500
          to-purple-500
          "
          style={{ margin: "1.0rem" }}
        >
          Send OTP
        </button>

      </form>
    </AuthCard>
  );
}