import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import AuthCard from "./AuthCard";

export default function OTPForm() {

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleVerify = (e) => {

    e.preventDefault();

    navigate("/reset-password");

};

  return (
    <AuthCard
      title="Verify OTP"
      subtitle="Enter the 6-digit code sent to your email."
      footer={
        <p className="text-center text-gray-400">

          Didn't receive the code?

          <button className="ml-2 text-cyan-400">
            Resend
          </button>

        </p>
      }
    >
      <form
        onSubmit={handleVerify}
        className="space-y-8"
      >

        <div className="flex justify-between gap-3">

          {[...Array(6)].map((_, index) => (

            <input
              key={index}

              ref={(el) => (inputRefs.current[index] = el)}

              maxLength={1}

              className="
              w-14
              h-14

              rounded-xl

              bg-[#151B30]/70

              border

              border-cyan-500/10

              text-center

              text-white

              text-xl

              outline-none

              focus:border-cyan-400
              "
              style={{ margin: "0.3rem" }}

              onChange={(e) => {
                if (
                  e.target.value &&
                  index < inputRefs.current.length - 1
                ) {
                  inputRefs.current[index + 1].focus();
                }
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "Backspace" &&
                  !e.target.value &&
                  index > 0
                ) {
                  inputRefs.current[index - 1].focus();
                }
              }}
            />

          ))}

        </div>

        <button
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
          "
          style={{ margin: "1.0rem" }}
        >
          Verify OTP
        </button>

      </form>
    </AuthCard>
  );
}