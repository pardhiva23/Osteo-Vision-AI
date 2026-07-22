import { useState } from "react";
import { Upload, FileImage, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadPanel() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "sample_xray.png",
      size: "1.2 MB",
      type: "Image",
      thumbnail: null,
    },
  ]);

  function handleRemove(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="
      p-6
      border-b
      border-cyan-500/10
      "
    >
      <h2 className="text-white text-xl font-semibold">
        Upload Files
      </h2>

      <p className="text-gray-400 text-sm mt-1">
        Upload medical images or documents to analyze with AI.
      </p>

      {/* Upload Box */}

      <button
        className="
        mt-6

        w-full
        h-40

        rounded-3xl

        border-2
        border-dashed
        border-cyan-500/25

        bg-white/[0.02]

        hover:bg-cyan-500/5

        transition-all

        flex
        flex-col

        items-center
        justify-center
        "
      >
        <Upload
          size={36}
          className="text-cyan-400"
        />

        <p className="text-white mt-4">
          Drag & drop files here
        </p>

        <p className="text-gray-500 text-sm mt-2">
          or click to browse
        </p>
      </button>

      <p className="text-gray-500 text-xs mt-3">
        Supports: JPG, PNG, DICOM, PDF (Max 20MB)
      </p>

      {/* Uploaded Files */}

      <div className="mt-8">

        <h3 className="text-white font-medium mb-4">
          Uploaded Files
        </h3>

        {files.length === 0 ? (

          <div
            className="
            rounded-2xl

            bg-white/[0.03]

            border
            border-white/10

            p-4
            "
          >

            <div className="flex gap-3">

              <FileImage
                size={22}
                className="text-cyan-400"
              />

              <div>

                <p className="text-white text-sm">
                  No image uploaded
                </p>

                <p className="text-gray-500 text-xs">
                  Waiting...
                </p>

              </div>

            </div>

          </div>

        ) : (

          <div className="space-y-3">

            {files.map((file) => (
              <div
                key={file.id}
                className="
                rounded-2xl

                bg-white/[0.03]

                border
                border-white/10

                p-4

                flex

                items-center

                justify-between

                gap-3
                "
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div
                    className="
                    w-11

                    h-11

                    rounded-xl

                    bg-white/5

                    flex

                    items-center

                    justify-center

                    shrink-0

                    overflow-hidden
                    "
                  >
                    {file.thumbnail ? (
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileImage
                        size={20}
                        className="text-cyan-400"
                      />
                    )}
                  </div>

                  <div className="min-w-0">

                    <p className="text-white text-sm truncate">
                      {file.name}
                    </p>

                    <p className="text-gray-500 text-xs">
                      {file.size} • {file.type}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => handleRemove(file.id)}
                  className="
                  text-gray-500

                  hover:text-red-400

                  transition

                  shrink-0
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>
            ))}

          </div>

        )}

      </div>

    </motion.div>
  );
}