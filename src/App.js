import "./App.css";
import React from "react";

import Messages from "./Messages/Messages";
import Input from "./Messages/Input";

import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username:
          this.randomName()[Math.floor(Math.random() * this.randomName.length)],
        color: this.randomColor(),
      },
    };
    this.drone = new window.Scaledrone("Xr0cgGuVvXwoknZN", {
      data: this.state.member,
    });
  }
  componentDidMount() {
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  randomName = () => {
    const config = {
      dictionaries: [starWars],
    };
    const arr = [];
    for (var i = 0; i < 50; i++) {
      const characterName = uniqueNamesGenerator(config);
      arr.push(characterName);
    }
    return arr;
  };

  randomColor = () => {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  };

  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>

        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />

        <div>
          <Footer />
        </div>
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
