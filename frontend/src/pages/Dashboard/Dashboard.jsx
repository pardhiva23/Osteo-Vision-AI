import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { getCurrentUser, logoutUser } from "../../services/auth";
import { getErrorMessage } from "../../services/api";
import { predictImage, getPredictionHistory } from "../../services/prediction";
import { sendChatMessage } from "../../services/chat";

const isImage = (file) => file.type?.startsWith("image/");

export default function Dashboard() {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    const [files, setFiles] = useState([]);

    const [user, setUser] = useState(null);

    // Latest prediction shown in the right-hand panel.
    const [result, setResult] = useState(null);

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(false);

    const addMessage = (role, text) =>
        setMessages((prev) => [...prev, { role, text }]);

    const refreshHistory = useCallback(async () => {
        try {
            setHistory(await getPredictionHistory());
        } catch {
            // History is a nice-to-have; ignore failures.
        }
    }, []);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(() => {
                // A 401 is handled globally (redirect to login).
            });

        refreshHistory();
    }, [refreshHistory]);

    const handleSend = async () => {

        const text = input.trim();

        const images = files.filter(isImage);

        if (loading || (!text && images.length === 0)) {
            if (files.length > 0 && images.length === 0) {
                addMessage(
                    "assistant",
                    "Only image files (JPG, PNG) can be analyzed."
                );
                setFiles([]);
            }
            return;
        }

        addMessage(
            "user",
            [text, images.length ? `📎 ${images[0].name}` : ""]
                .filter(Boolean)
                .join("\n")
        );

        setInput("");
        setFiles([]);
        setLoading(true);

        let predictionId = result?.prediction_id ?? null;

        // 1. Run the CNN on the first uploaded image.
        if (images.length > 0) {

            try {

                const data = await predictImage(images[0]);

                setResult(data);

                predictionId = data.prediction_id;

                addMessage(
                    "assistant",
                    `Analysis complete: ${data.prediction} ` +
                    `(${data.confidence.toFixed(1)}% confidence). ` +
                    "See the Analysis Results panel for details." +
                    (images.length > 1
                        ? " Only the first image was analyzed."
                        : "")
                );

                refreshHistory();

            } catch (error) {

                addMessage(
                    "assistant",
                    `Prediction failed: ${getErrorMessage(error)}`
                );

                predictionId = result?.prediction_id ?? null;
            }
        }

        // 2. Ask the AI assistant (uses the current scan as context).
        if (text) {

            try {

                const reply = await sendChatMessage(text, predictionId);

                addMessage("assistant", reply);

            } catch (error) {

                addMessage(
                    "assistant",
                    `Chat failed: ${getErrorMessage(error)}`
                );
            }
        }

        setLoading(false);
    };

    const handleNewChat = () => {
        setMessages([]);
        setInput("");
        setFiles([]);
        setResult(null);
    };

    const handleSelectPrediction = (item) => {
        setResult({
            prediction_id: item.id,
            image_name: item.image_name,
            prediction: item.prediction,
            confidence: item.confidence,
            inference_time: item.inference_time,
            images: item.images,
        });
    };

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (

        <DashboardLayout

            messages={messages}

            input={input}

            setInput={setInput}

            files={files}

            setFiles={setFiles}

            onSend={handleSend}

            loading={loading}

            user={user}

            result={result}

            history={history}

            onNewChat={handleNewChat}

            onSelectPrediction={handleSelectPrediction}

            onLogout={handleLogout}

        />

    );

}
