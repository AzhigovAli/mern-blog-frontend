"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("@mui/material/Container"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const components_1 = require("./components");
const pages_1 = require("./pages");
const react_redux_1 = require("react-redux");
const auth_1 = require("./redux/slices/auth");
function App() {
    const dispatch = (0, react_redux_1.useDispatch)();
    react_1.default.useEffect(() => {
        dispatch((0, auth_1.fetchAuthMe)());
    }, []);
    return (<>
      <components_1.Header />
      <Container_1.default maxWidth="lg">
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<pages_1.Home />}/>
          <react_router_dom_1.Route path="/posts/:id" element={<pages_1.FullPost />}/>
          <react_router_dom_1.Route path="/posts/:id/edit" element={<pages_1.AddPost />}/>
          <react_router_dom_1.Route path="/add-post" element={<pages_1.AddPost />}/>
          <react_router_dom_1.Route path="/login" element={<pages_1.Login />}/>
          <react_router_dom_1.Route path="/register" element={<pages_1.Registration />}/>
        </react_router_dom_1.Routes>
      </Container_1.default>
    </>);
}
exports.default = App;
