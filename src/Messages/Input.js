import React from "react";

class Input extends React.Component {
  state = {
    text: "",
  };

  onChange(event) {
    this.setState({ text: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.text === "") {
      return;
    }
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <input
            onChange={(event) => this.onChange(event)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message"
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
