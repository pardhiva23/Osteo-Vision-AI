import { useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Dashboard() {

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    const [files, setFiles] = useState([]);

    const handleSend = () => {

        // We'll write this later

    };

    return (

        <DashboardLayout

            messages={messages}

            input={input}

            setInput={setInput}

            files={files}

            setFiles={setFiles}

            onSend={handleSend}

        />

    );

}