import { useEffect, useMemo, useRef } from "react";
import {
  Image,
  Paperclip,
  SendHorizonal,
  X,
  FileText,
} from "lucide-react";

export default function ChatInput({ input, setInput, files, setFiles, onSend }) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Auto-grow the textarea as the user types, capped at 180px.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, [input]);

  // Build (and clean up) preview URLs for any image files that are attached.
  const previews = useMemo(() => {
    return (files || []).map((file) => ({
      file,
      url: file.type?.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => p.url && URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const handleSend = () => {
    if (!input.trim() && (!files || files.length === 0)) return;
    onSend();

    // Reset textarea height after sending.
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Shift+Enter falls through to the textarea's default newline behavior.
  };

  const handleFilePick = (e) => {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;
    setFiles((prev) => [...(prev || []), ...picked]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="
      px-10
      py-6

      border-t
      border-cyan-500/10
      "
      style={{margin:"1rem"}}
    >
      {/* Attached file previews */}
      {previews.length > 0 && (
        <div
          className="
          flex
          flex-wrap
          gap-3

          mb-3
          "
        >
          {previews.map(({ file, url }, index) => (
            <div
              key={index}
              className="
              relative

              w-16
              h-16

              rounded-xl

              overflow-hidden

              border
              border-cyan-500/20

              bg-[#101726]/80

              flex
              items-center
              justify-center

              group
              "
            >
              {url ? (
                <img
                  src={url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center px-1 text-center">
                  <FileText size={18} className="text-cyan-400" />
                  <span className="text-[9px] text-gray-400 line-clamp-1 mt-1">
                    {file.name}
                  </span>
                </div>
              )}

              <button
                onClick={() => removeFile(index)}
                className="
                absolute
                top-1
                right-1

                w-4
                h-4

                rounded-full

                bg-black/70

                flex
                items-center
                justify-center

                text-gray-300

                hover:text-white
                hover:bg-black

                transition

                opacity-0
                group-hover:opacity-100
                "
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className="
        min-h-16

        rounded-2xl

        border
        border-cyan-500/10

        bg-[#101726]/80

        backdrop-blur-xl

        flex

        items-end

        px-5
        py-3

        gap-4
        "
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFilePick}
          className="hidden"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          ref={imageInputRef}
          onChange={handleFilePick}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="
          text-gray-400

          hover:text-cyan-400

          transition

          shrink-0

          mb-1.5
          "
          style={{marginBottom:"1.2rem", marginLeft:"1rem"}}
        >
          <Paperclip size={22} />
        </button>

        <button
          onClick={() => imageInputRef.current?.click()}
          className="
          text-gray-400

          hover:text-cyan-400

          transition

          shrink-0

          mb-1.5
          "
          style={{marginBottom:"1.2rem"}}
        >
          <Image size={22} />
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask OsteoVision anything..."
          className="
          flex-1

          bg-transparent

          outline-none

          resize-none

          text-white

          placeholder:text-gray-500

          leading-6

          py-1.5

          max-h-[180px]

          overflow-y-auto
          "
          style={{marginBottom:"1.2rem", marginLeft:"1rem"}}
        />

        <button
          onClick={handleSend}
          className={`
          w-11

          h-11

          rounded-full

          flex

          items-center

          justify-center

          text-white

          shrink-0

          mb-0.5

          transition-all

          hover:opacity-90

          ${
          input.trim() || files.length
          
          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105"
          
          : "bg-white/10 text-gray-500 cursor-not-allowed"
        }
        `}
          
          style={{margin:"0.6rem"}}
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}