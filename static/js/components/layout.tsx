import * as React from "react";

export interface LayoutProps { compiler: string; framework: string; }

export const Layout = (props: LayoutProps) => (
    <div className="layout"></div>
);