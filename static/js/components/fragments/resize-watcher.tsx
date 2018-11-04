import * as React from "react";
import { bind } from "decko";
import ResizeObserver from "resize-observer-polyfill";

export interface ResizeWatcherProps {
  children: (width: number) => React.ReactNode;
}

/**
 * Контролирует изменение ширины контейнера и оповещает своих потомков в дереве через render prop
 */
export default class ResizeWatcher extends React.Component<
  ResizeWatcherProps,
  ResizeWatcherState
> {
  private _containerRef: React.RefObject<HTMLDivElement>;

  /**
   * Обсервер, который оповещает об изменении размеров элемента.
   *
   * @see https://developers.google.com/web/updates/2016/10/resizeobserver
   * @see https://wicg.github.io/ResizeObserver/
   * @private
   * @type {ResizeObserver}
   * @memberof ResizeWatcher
   */
  private _ro: ResizeObserver;

  private readonly _style: React.CSSProperties = {
    width: "100%",
    contain: "strict"
  };

  constructor(props: ResizeWatcherProps) {
    super(props);

    this._containerRef = React.createRef();
    this._ro = new ResizeObserver(this._observerCallback);

    this.state = {};
  }

  componentDidMount() {
    if (this._containerRef.current) {
      this._initObserver();
    }
  }

  componentWillUnmount() {
    this._ro.disconnect();
  }

  render() {
    return (
      <>
        {this.state.width && this.props.children(this.state.width)}
        <div ref={this._containerRef} style={this._style} />
      </>
    );
  }

  private _initObserver() {
    this._containerRef.current && this._ro.observe(this._containerRef.current);
  }

  private _observerCallback: ResizeObserverCallback = entries => {
    this._emitChildrens(entries[0].contentRect.width);
  };

  /**
   * Устанавливает новое значение в state
   *
   * @private
   * @memberof ResizeWatcher
   */
  private _emitChildrens = (width: number) => {
    if (width !== this.state.width) this.setState({ width });
  };
}

export interface ResizeWatcherState {
  width?: number;
}
