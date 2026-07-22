import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function PredictionPanel({
  prediction = "Osteosarcoma Detected",
  confidence = 92.4,
  analysis = "The model has detected patterns consistent with osteosarcoma in the uploaded image.",
  reportUrl = null,
}) {
  const hasResult = Boolean(prediction);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .2 }}
      className="p-6"
    >
      <h2 className="text-white text-xl font-semibold">
        Analysis Results
      </h2>

      <div
        className="
        mt-6

        rounded-3xl

        border
        border-cyan-500/10

        bg-white/[0.03]

        p-6
        "
      >

        <span
          className="
          inline-block

          text-xs

          font-medium

          text-emerald-400

          bg-emerald-400/10

          px-3

          py-1

          rounded-full
          "
        >
          Prediction
        </span>

        <h3 className="text-white text-lg font-semibold mt-4">
          {hasResult ? prediction : "Waiting..."}
        </h3>

        <div className="mt-6">

          <div className="flex items-center justify-between">

            <p className="text-gray-400 text-sm">
              Confidence Score
            </p>

            <p className="text-cyan-400 text-sm font-medium">
              {hasResult ? `${confidence}%` : "--"}
            </p>

          </div>

          <div
            className="
            mt-3

            h-2

            rounded-full

            bg-white/10

            overflow-hidden
            "
          >

            <div
              className="
              h-full

              bg-gradient-to-r

              from-cyan-500

              to-blue-500
              "
              style={{ width: hasResult ? `${confidence}%` : "0%" }}
            />

          </div>

        </div>

        <div className="mt-6">

          <p className="text-gray-400 text-sm">
            Analysis
          </p>

          <p className="text-gray-300 text-sm mt-2 leading-6">
            {hasResult ? analysis : "Upload a scan to see analysis details."}
          </p>

        </div>

        <button
          disabled={!hasResult}
          className="
          mt-8

          w-full

          h-12

          rounded-xl

          bg-white/90

          hover:bg-white

          text-[#0A1020]

          font-medium

          flex

          items-center

          justify-center

          gap-2

          transition

          disabled:opacity-50

          disabled:cursor-not-allowed
          "
        >
          View Full Report
          <ExternalLink size={16} />
        </button>

      </div>

      <p className="text-gray-500 text-xs mt-4">
        Results are AI-generated and should be reviewed by a medical professional.
      </p>

    </motion.div>
  );
}