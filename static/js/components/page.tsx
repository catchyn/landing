import * as React from "React";
import { CursorFunny } from "./fragments/cursor-funny";
import { Jelle } from "./fragments/jelle/jelle";
import ResizeWatcher from "./fragments/resize-watcher";

interface PageProps {}

export class Page extends React.Component<PageProps> {
  render() {
    return (
      <div id="scrollPage" className="page">
        <ResizeWatcher>
          { width => 
            <div className="intro-wrap">
              <div className="intro">
                <div className="intro_header">LIKHACHEV ALEXANDR</div>
                <Jelle extraClass="intro_jelle" width={width} />
              </div>
            </div>
          }
        </ResizeWatcher>
      </div>
    );
  }
}
