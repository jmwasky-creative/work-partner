import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { DashboardPage } from "../pages/dashboard-page";
import { FeedbackPage } from "../pages/feedback-page";
import { GoalsPage } from "../pages/goals-page";
import { PetPage } from "../pages/pet-page";
import { TasksPage } from "../pages/tasks-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "goals", element: <GoalsPage /> },
      { path: "pet", element: <PetPage /> },
      { path: "feedback", element: <FeedbackPage /> },
    ],
  },
]);
