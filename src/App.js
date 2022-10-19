import LoginPage from "./components/page/login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CommonList from "./components/common/list";
import Dashboard from "./components/common/layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"/list"} element={<CommonList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
