// import Sidebar from "./Sidebar";
// import ChatWindow from "./ChatWindow";
// import ChatInput from "./ChatInput";
// import UploadPanel from "./UploadPanel";
// import PredictionPanel from "./PredictionPanel";


// import background from "../../assets/images/dashboard-bg.png";

// export default function DashboardLayout({

//     messages,

//     input,

//     setInput,

//     files,

//     setFiles,

//     onSend,

//     loading,

//     user,

//     result,

//     history,

//     onNewChat,

//     onSelectPrediction,

//     onLogout,

// }) {
//     return (
//         <div
//             className="
//             h-screen
//             w-screen
//             overflow-hidden
//             bg-cover
//             bg-center
//             "
//             style={{
//                 backgroundImage: `url(${background})`,
//             }}
//         >
//             <div
//                 className="
//                 h-full
//                 grid
//                 grid-cols-[290px_1fr_340px]
//                 "
//             >
//                 <Sidebar
//                     user={user}
//                     history={history}
//                     activeId={result?.prediction_id}
//                     onNewChat={onNewChat}
//                     onSelect={onSelectPrediction}
//                     onLogout={onLogout}
//                 />

//                 <div className="flex flex-col h-full">

//                     <ChatWindow 
//                         messages={messages}
//                         loading={loading}
//                     />

//                     <ChatInput 
//                         input={input}

//                         setInput={setInput}

//                         files={files}

//                         setFiles={setFiles}

//                         onSend={onSend}
//                     />

//                 </div>

//                 <div
//                     className="
//                     border-l
//                     border-cyan-500/10
//                     backdrop-blur-xl
//                     bg-[#0B1120]/50

//                     overflow-y-auto
//                     "
//                 >
//                     <UploadPanel files={files} setFiles={setFiles} />

//                     <PredictionPanel result={result} />
//                 </div>

//             </div>
//         </div>
//     );
// }

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import UploadPanel from "./UploadPanel";
import PredictionPanel from "./PredictionPanel";

import background from "../../assets/images/dashboard-bg.png";

export default function DashboardLayout({
    messages,
    input,
    setInput,
    files,
    setFiles,
    onSend,
    loading,
    user,
    result,
    history,
    onNewChat,
    onSelectPrediction,
    onLogout,
}) {
    return (
        <div
            className="h-screen w-screen overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div
                className="
                h-full
                min-h-0
                grid
                grid-cols-[290px_minmax(0,1fr)_340px]
                grid-rows-[minmax(0,1fr)]
                "
            >
                <Sidebar
                    user={user}
                    history={history}
                    activeId={result?.prediction_id}
                    onNewChat={onNewChat}
                    onSelect={onSelectPrediction}
                    onLogout={onLogout}
                />

                {/* Chat column: messages scroll, input stays at the bottom */}
                <div className="flex flex-col h-full min-h-0 overflow-hidden">
                    <ChatWindow messages={messages} loading={loading} />

                    <ChatInput
                        input={input}
                        setInput={setInput}
                        files={files}
                        setFiles={setFiles}
                        onSend={onSend}
                    />
                </div>

                {/* Right panel scrolls on its own */}
                <div
                    className="
                    h-full
                    min-h-0
                    border-l
                    border-cyan-500/10
                    backdrop-blur-xl
                    bg-[#0B1120]/50
                    overflow-y-auto
                    overflow-x-hidden
                    "
                >
                    <UploadPanel files={files} setFiles={setFiles} />

                    <PredictionPanel result={result} />
                </div>
            </div>
        </div>
    );
}