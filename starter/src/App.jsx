import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, Login, Dashboard } from "./pages";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const App = () => {
  return <RouterProvider router={route}></RouterProvider>;
};
export default App;
