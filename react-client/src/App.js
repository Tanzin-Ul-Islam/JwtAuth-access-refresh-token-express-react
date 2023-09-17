import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/Home";
import DataProvider from "./contextApi/DataProvider";
import AuthGuard from "./guard/AuthGuard";
function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>}></Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
