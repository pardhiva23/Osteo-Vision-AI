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

}) {
    return (
        <div
            className="
            h-screen
            w-screen
            overflow-hidden
            bg-cover
            bg-center
            "
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div
                className="
                h-full
                grid
                grid-cols-[290px_1fr_340px]
                "
            >
                <Sidebar />

                <div className="flex flex-col h-full">

                    <ChatWindow 
                        messages={messages}
                    />

                    <ChatInput 
                        input={input}

                        setInput={setInput}

                        files={files}

                        setFiles={setFiles}

                        onSend={onSend}
                    />

                </div>

                <div
                    className="
                    border-l
                    border-cyan-500/10
                    backdrop-blur-xl
                    bg-[#0B1120]/50

                    overflow-y-auto
                    "
                >
                    <UploadPanel />

                    <PredictionPanel />
                </div>

            </div>
        </div>
    );
}