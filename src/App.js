import Routers from "./router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMe} from "./api/common";

function App() {
    const [role, setRole] = useState();
    const {loggedInSuccess} = useSelector(state => state.loginReducer)


    useEffect(() => {
        if (loggedInSuccess) {
            setRole(getMe().role);
        }
    }, [loggedInSuccess]);

    return <Routers role={role}/>;
}

export default App;
