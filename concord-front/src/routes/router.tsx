import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
  },
]);

export default router;
