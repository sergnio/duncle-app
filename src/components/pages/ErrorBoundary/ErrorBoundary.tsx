import React from "react";
import { ErrorInfo, Component } from "react";

type State = {
  hasError: boolean;
  error: Error;
  info: ErrorInfo;
};

export class ErrorBoundary extends Component<{}, State> {
  state = {
    hasError: false,
    error: { name: "", message: "" },
    info: { componentStack: "" },
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info, hasError: true });
  }

  render() {
    if (this.state.hasError) {
      const {
        error,
        info: { componentStack },
      } = this.state;

      const { pathname } = window.location;

      return (
        <div>
          <p>We apologize. Something happened that we did not account for.</p>
          <div>
            {/*css={alignCenter}>*/}
            <h6>This might be solved with a hard refresh.</h6>
            <div>
              <div>
                {/*css={refreshInstructions}>*/}
                <div>PC: Ctrl + F5 </div>
                <div>Mac: ⌘Cmd + Shift + R</div>
              </div>
            </div>
          </div>
          <div>
            {/*css={detailsContainer}>*/}
            <details>
              <summary>
                If this error persists. Please send this info to developers.
              </summary>
              <dl>
                <dt>Message:</dt>
                <dd>{error.message}</dd>
                <dt>URL:</dt>
                <dd>{pathname}</dd>
                <dt>Stack:</dt>
                <dd>{componentStack}</dd>
              </dl>
            </details>
            <div>
              <a
                href={`mailto:sergnio@gmail.com?subject=CRM Error&body=Message: ${error.message}%0D%0AURL: ${pathname}%0D%0AStack:${componentStack}`}
              >
                <span>Click to report</span>
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
