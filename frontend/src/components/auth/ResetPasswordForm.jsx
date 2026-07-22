import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import AuthCard from "./AuthCard";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const PasswordField = ({ placeholder, show, toggle }) => (
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
        type={show ? "text" : "password"}
        placeholder={placeholder}
        style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
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
        "
      />

      <button
        type="button"
        onClick={toggle}
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

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Create a new password."
    >

      <form
    className="space-y-6"
    onSubmit={(e) => {

        e.preventDefault();

        alert("Password Reset Successfully!");

        navigate("/login");

    }}
>

        <PasswordField
          placeholder="New Password"
          show={show1}
          toggle={() => setShow1(!show1)}
        />

        <PasswordField
          placeholder="Confirm Password"
          show={show2}
          toggle={() => setShow2(!show2)}
        />

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
          Reset Password
        </button>

      </form>

    </AuthCard>
  );
}