import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {persistor, store} from "./redux/store/store";
import {PersistGate} from "redux-persist/integration/react";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import setupInterceptors from "./system/axios/config/Interceptors";
import vi_VN from 'antd/es/locale/vi_VN';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider locale={vi_VN}>
                <App/>
            </ConfigProvider>
        </PersistGate>
    </Provider>
);

setupInterceptors(store);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
