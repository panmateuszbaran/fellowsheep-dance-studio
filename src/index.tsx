import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import 'antd/dist/antd.min.css';

import Router from "./router";
import i18n from "./translation";

import { registerLicense } from '@syncfusion/ej2-base';
import { GoogleOAuthProvider } from '@react-oauth/google';


registerLicense("ORg4AjUWIQA/Gnt2XFhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5XdERjXXxbdXNWQWVaWkZ/");

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

ReactDOM.render(
<GoogleOAuthProvider clientId="705803557545-7qituk5dc36cotjv0l9op0n13loj82ag.apps.googleusercontent.com"><App /></GoogleOAuthProvider>, document.getElementById("root"));
