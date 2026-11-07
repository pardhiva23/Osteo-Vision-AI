import { useRef, useState } from "react";
import { Upload, FileImage, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const formatSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function UploadPanel({ files = [], setFiles }) {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const addFiles = (list) => {
    const picked = Array.from(list || []);

    if (picked.length === 0) return;

    setFiles((prev) => [...(prev || []), ...picked]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

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
      style={{marginBottom:"0.5rem", marginLeft:"0.8rem"}}
    >
      <h2 className="text-white text-xl font-semibold">
        Upload Files
      </h2>

      <p className="text-gray-400 text-sm mt-1">
        Upload a histopathology image, then press send to analyze it with AI.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Upload Box */}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
        mt-6

        w-full
        h-40

        rounded-3xl

        border-2
        border-dashed
        border-cyan-500/25

        ${dragging ? "bg-cyan-500/10" : "bg-white/[0.02]"}

        hover:bg-cyan-500/5

        transition-all

        flex
        flex-col

        items-center
        justify-center
        `}
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
        Supports: JPG, PNG
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

            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
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
                    <FileImage
                      size={20}
                      className="text-cyan-400"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-white text-sm truncate">
                      {file.name}
                    </p>

                    <p className="text-gray-500 text-xs">
                      {formatSize(file.size)} • {file.type?.startsWith("image/") ? "Image" : "File"}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => handleRemove(index)}
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
