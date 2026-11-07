import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { mediaUrl } from "../../services/api";

const ANALYSIS = {
  "Non-Tumor":
    "The model found no tumor tissue pattern in this image.",
  "Non-Viable-Tumor":
    "The model found patterns consistent with non-viable (necrotic) tumor tissue.",
  Viable:
    "The model found patterns consistent with viable tumor tissue.",
};

const BADGE = {
  "Non-Tumor": "text-emerald-400 bg-emerald-400/10",
  "Non-Viable-Tumor": "text-amber-400 bg-amber-400/10",
  Viable: "text-red-400 bg-red-400/10",
};

export default function PredictionPanel({ result = null }) {
  const hasResult = Boolean(result);

  const confidence = hasResult ? Number(result.confidence) : 0;

  const probabilities = result?.probabilities
    ? Object.entries(result.probabilities)
    : [];

  const overlay = mediaUrl(result?.images?.gradcam_overlay);

  const featureMaps = mediaUrl(result?.images?.feature_maps);

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
        style={{marginBottom:"0.4rem", marginLeft:"0.2rem"}}
      >

        <span
          className={`
          inline-block

          text-xs

          font-medium

          px-3

          py-1

          rounded-full

          ${hasResult ? (BADGE[result.prediction] || BADGE["Non-Tumor"]) : "text-gray-400 bg-white/5"}
          `}

          style={{marginBottom:"0.4rem", marginLeft:"1rem"}}
        >
          Prediction
        </span>

        <h3 className="text-white text-lg font-semibold mt-4" style={{marginLeft:"1rem"}}>
          {hasResult ? result.prediction : "Waiting..."}
        </h3>

        {hasResult && (
          <p className="text-gray-500 text-xs mt-1 truncate" style={{marginLeft:"1rem"}}>
            {result.image_name}
          </p>
        )}

        <div className="mt-6">

          <div className="flex items-center justify-between" style={{marginBottom:"1.2rem", marginLeft:"1rem"}}>

            <p className="text-gray-400 text-sm">
              Confidence Score
            </p>

            <p className="text-cyan-400 text-sm font-medium">
              {hasResult ? `${confidence.toFixed(1)}%` : "--"}
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
            style={{marginBottom:"1rem", marginLeft:"1rem"}}
          >

            <div
              className="
              h-full

              bg-gradient-to-r

              from-cyan-500

              to-blue-500
              "
              style={{ width: hasResult ? `${Math.min(confidence, 100)}%` : "0%" }}
            />

          </div>

        </div>

        {probabilities.length > 0 && (
          <div className="mt-4" style={{marginBottom:"1.2rem", marginLeft:"1rem"}}>

            <p className="text-gray-400 text-sm">
              Class Probabilities
            </p>

            {probabilities.map(([name, value]) => (
              <div key={name} className="mt-2">

                <div className="flex justify-between text-xs text-gray-300">
                  <span>{name}</span>
                  <span>{(value * 100).toFixed(1)}%</span>
                </div>

                <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500/70"
                    style={{ width: `${value * 100}%` }}
                  />
                </div>

              </div>
            ))}

          </div>
        )}

        <div className="mt-6" style={{marginBottom:"1.2rem", marginLeft:"1rem"}}>

          <p className="text-gray-400 text-sm">
            Analysis
          </p>

          <p className="text-gray-300 text-sm mt-2 leading-6">
            {hasResult
              ? ANALYSIS[result.prediction] || "Analysis complete."
              : "Upload a scan to see analysis details."}
          </p>

        </div>

        {overlay && (
          <div style={{marginBottom:"1.2rem", marginLeft:"1rem"}}>

            <p className="text-gray-400 text-sm">
              Grad-CAM Heatmap
            </p>

            <img
              src={overlay}
              alt="Grad-CAM overlay"
              className="mt-2 w-full rounded-xl border border-cyan-500/10"
            />

          </div>
        )}

        <button
          disabled={!featureMaps}
          onClick={() => window.open(featureMaps, "_blank", "noopener")}
          className="
          mt-8

          w-full

          h-10

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
          style={{marginBottom:"0.5rem", marginLeft:"0.5rem"}}
        >
          View Feature Maps
          <ExternalLink size={16} />
        </button>

      </div>

      <p className="text-gray-500 text-xs mt-4">
        Results are AI-generated and should be reviewed by a medical professional.
      </p>

    </motion.div>
  );
}
