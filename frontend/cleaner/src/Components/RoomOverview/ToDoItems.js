import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const checkBox = styled.button`
  background: props.primary = "red";
  color: ${props => (props.primary ? "white" : "palevioletred")};
`;

class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }

  //TODO: Must come from backEND
  //TODO: Onclick Entry should be on checkbox later
  //if needed maybe export each item.text to a seperate component (e.g. ToDoItem)
  createTasks(item) {
    return (
      <li
        //TODO: onClick it should route to the next page
        // onClick={() => this.complete(item.key)}
        key={item.key}
      >
        <Checkbox
          color="primary"
          onChange={(a, b) => this.complete(b, item.key, item.text)}
        />{" "}
        {item.text}
      </li>
    );
  }

  //TODO: must be changed to "Completed" and then send to backend
  //TODO: must also be done via checkbox
  complete(checked, key, text) {
    console.log(checked, key, text);
    if (checked) {
      //TODO: send to backend
    }
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <div>
        <ul className="theList">{listItems}</ul>
        <Button primary>Primary</Button>
      </div>
    );
  }
}

export default TodoItems;
