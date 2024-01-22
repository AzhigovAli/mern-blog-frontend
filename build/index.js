"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
const react_router_dom_1 = require("react-router-dom");
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
require("./index.scss");
const material_1 = require("@mui/material");
const theme_1 = require("./theme");
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./redux/store"));
const root = react_dom_1.default.createRoot(document.getElementById('root'));
root.render(<>
    <CssBaseline_1.default />
    <material_1.ThemeProvider theme={theme_1.theme}>
      <react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.default}>
          <App_1.default />
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>
    </material_1.ThemeProvider>
  </>);
