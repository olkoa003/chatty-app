import { Provider } from "react-redux";
import { Router } from "./components/Router/Router";
import { store }  from "./store";

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;