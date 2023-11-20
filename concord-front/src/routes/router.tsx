import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import WaitingRoom from "../pages/WaitingRoom";
import Meeting from "../pages/MeetingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { path: "", element: <WaitingRoom /> },
      { path: "/meeting", element: <Meeting /> },
    ],
  },
]);

export default router;
