// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import MessageBubble from "./MessageBubble";

// export default function ChatWindow({ messages = [], loading = false }) {
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//   }, [messages, loading]);

//   const hasMessages = messages.length > 0;

//   return (
//     <div
//       ref={scrollRef}
//       className={`
//       flex-1
//       min-h-0

//       overflow-y-auto

//       px-12
//       py-10

//       flex
//       flex-col

//       ${hasMessages ? "" : "items-center justify-center"}
//       `}
//     >
//       {hasMessages ? (
//         <div
//           className="
//           w-full
//           max-w-3xl
//           mx-auto

//           flex
//           flex-col

//           gap-6
//           "
//         >
//           {messages.map((message, index) => (
//             <MessageBubble
//               key={index}
//               role={message.role}
//               text={message.text}
//             />
//           ))}

//           {loading && (
//             <MessageBubble role="assistant" text="Thinking..." />
//           )}

//         </div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, scale: .9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: .5 }}
//           className="text-center max-w-3xl"
//         >

//           <h1
//             className="
//             mt-8

//             text-5xl

//             font-bold

//             text-white
//             "
//           >
//             Welcome to{" "}
//             <span className="text-cyan-400">
//               Osteo Vision
//             </span>
//           </h1>

//           <p
//             className="
//             mt-6

//             text-gray-400

//             text-lg

//             leading-8
//             "
//           >
//             Ask anything about osteosarcoma detection,
//             medical images, or model insights.
//           </p>

//         </motion.div>
//       )}
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages = [], loading = false }) {
  const scrollRef = useRef(null);

  // Scroll only this container (not the whole page) to the newest message.
  useEffect(() => {
    const el = scrollRef.current;

    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading]);

  const hasMessages = messages.length > 0;

  return (
    <div
      ref={scrollRef}
      className={`
      flex-1
      min-h-0
      overflow-y-auto
      px-12
      py-10
      flex
      flex-col
      ${hasMessages ? "" : "items-center justify-center"}
      `}
    >
      {hasMessages ? (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              text={message.text}
            />
          ))}

          {loading && <MessageBubble role="assistant" text="Thinking..." />}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl"
        >
          <h1 className="mt-8 text-5xl font-bold text-white">
            Welcome to <span className="text-cyan-400">Osteo Vision</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-8">
            Ask anything about osteosarcoma detection, medical images, or
            model insights.
          </p>
        </motion.div>
      )}
    </div>
  );
}