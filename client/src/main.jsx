import React from "react";
import ReactDOM from "react-dom/client";
import {Analytics} from "@vercel/analytics/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { StateContextProvider } from "./context";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <ThirdwebProvider activeChain={ChainId.Mumbai}>
            <Router>
                <StateContextProvider>
                    <App />
                </StateContextProvider>
            </Router>

        </ThirdwebProvider>
        <Analytics />
    </>
);

