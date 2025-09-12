import { Page } from "@dynatrace/strato-components-preview/layouts";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { IntroPage } from "./pages/IntroPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ScoreboardPage } from "./pages/ScoreboardPage";
import { TimerProvider } from "./contexts/TimerContext";
import { QuizProvider } from "./contexts/QuizContext";

export const App = () => {
  return (
    <TimerProvider>
      <QuizProvider>
        <Page>
          <Page.Header>
            <Header />
          </Page.Header>
          <Page.Main>
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/quiz/:questionId" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/scoreboard" element={<ScoreboardPage />} />
            </Routes>
          </Page.Main>
        </Page>
      </QuizProvider>
    </TimerProvider>
  );
};
