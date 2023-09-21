import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/Home";
import DataProvider from "./contextApi/DataProvider";
import AuthGuard from "./guard/AuthGuard";
import InitAuth from "./component/InitAuth";
function App() {
  return (
    <DataProvider>
      <InitAuth />
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>}></Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
