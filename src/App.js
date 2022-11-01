import LoginPage from "./components/page/login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/common/layout";
import BusinessList from "./components/apps/business";
import RootPage from "./components/page";
import BusinessRouter from "./components/apps/business/router";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootPage/>}>
                    <Route index element={<BusinessList/>}/>
                    <Route path={"/business/*"} element={<BusinessRouter/>}/>
                    <Route path={"/dashboard"} element={<Dashboard/>}/>

                </Route>
                <Route path={"/login"} element={<LoginPage/>}/>
                {/*<Route path={"/list"} element={<CommonList/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
