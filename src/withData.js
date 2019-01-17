import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

export function withFetchedData(WrappedComponent, { url, interval = 4000 }) {
  class WithFetchedData extends React.Component {
    constructor(props) {
      super(props);
      this.controller = new AbortController();
      this.signal = this.controller.signal;
      this.request = new Request(url, { signal: this.signal, mode: "cors" });
      this.state = {
        data: undefined
      };
    }

    componentDidMount() {
      this.signal.addEventListener("abort", () => {
        console.log("Fetch data request aborted: " + this.signal.aborted);
      });

      this.fetchData();
      this.timer = setInterval(() => {
        this.fetchData();
      }, interval);
    }

    componentWillUnmount() {
      console.log(
        "component Will UnMount, abort polling loop and current request"
      );
      clearInterval(this.timer);
      this.controller.abort();
    }

    fetchData() {
      fetch(this.request)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({ data });
        })
        .catch(err => {
          if (err.name === "AbortError") {
            console.log("Fetch data aborted");
          } else {
            console.error("Fetching error!", err);
          }
        });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }

  WithFetchedData.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;
  hoistNonReactStatic(WithFetchedData, WrappedComponent);

  return WithFetchedData;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
