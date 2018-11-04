import * as React from "react";
import * as ReactDOM from "react-dom";
// entry point for build less files
import "../less/app";

import { Layout } from "./components/layout";
import { Page } from "./components/page";

ReactDOM.render(<Page />, document.getElementById("example"));
