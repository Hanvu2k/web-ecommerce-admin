import LayoutPage from "./components/LayoutPage";
import { publicRoutes } from "./routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LayoutPage />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
