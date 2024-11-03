import React, { createContext, useState } from 'react';
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setInput(""); // Clear the input text
        setRecentPrompt(""); // Reset the recent prompt
        setResultData(""); // Clear result data
    }

    const onSent = async (prompt) => {
        setLoading(true);
        setRecentPrompt(prompt);
        
        // Add prompt only if it's new
        setPrevPrompts(prev => {
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev;
        });

        try {
            const result = await run(prompt);
            let responseArray = result.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArray = newResponse2.split(" ");
            setResultData("");

            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }

            setShowResult(true);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadPreviousChat = (prompt) => {
        setInput(prompt); // Set input to the previous prompt
        setShowResult(false); // Don't show result until it's sent again
        setRecentPrompt(prompt); // Set the recent prompt to the selected previous chat
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        loadPreviousChat // Expose the function to load previous chats
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
