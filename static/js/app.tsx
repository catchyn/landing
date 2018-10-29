import * as React from "react";
import * as ReactDOM from "react-dom";
// entry point for build less files
import "../less/app";

import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);