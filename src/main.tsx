import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import store from "./Redux/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <Provider store={store}>
    <App />
  </Provider>
);
