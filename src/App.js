import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import InvalidPage from "./pages/InvalidPage/InvalidPage";
import CheckTokenWithoutNavigate from "./components/CheckTokenWithoutNavigate";

export default function App() {
    return (
        <>
            <CheckTokenWithoutNavigate />

            <BrowserRouter basemname={`/${process.env.PUBLIC_URL}`}>
                <Routes>
                    <Route path="/*" element={<InvalidPage /> } />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/auth" exact element={<AuthPage />} />
                    <Route path="/results" exact element={<ResultsPage />} />
                    <Route path="/search" exact element={<SearchPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}