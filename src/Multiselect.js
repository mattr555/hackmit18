import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const ItemTypes = {
  CARD: "card"
};

class UnwrappedCard extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      text
    } = this.props;
    const style = {
      border: "1px solid black",
      marginBottom: ".5rem",
      backgroundColor: "white",
      cursor: "move",
      opacity: isDragging ? 0 : 1
    };

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(connectDropTarget(<div style={style}>{text}</div>))
    );
  }
}

const dragSource = {
  beginDrag(props) {
    return { id: props.id, index: props.index };
  }
};

const dropTarget = {
  hover(props, monitor, component) {
    if (!component) return null;

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) return;

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffest = monitor.getClientOffset();
    const hoverClientY = clientOffest.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveItem(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

const Card = DropTarget(ItemTypes.CARD, dropTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.CARD, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(UnwrappedCard)
);

class Multiselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: "wooow" },
        { id: 2, text: "ayy" },
        { id: 3, text: "lmao" },
        { id: 4, text: "damn" },
        { id: 5, text: "AA AAA AAAA" }
      ]
    };
  }

  moveItem = (dragIndex, hoverIndex) => {
    const { items } = this.state;
    const clone = [...items];
    Array.prototype.splice.call(
      clone,
      hoverIndex,
      0,
      Array.prototype.splice.call(clone, dragIndex, 1)[0]
    );
    this.setState({ items: clone });
  };

  render() {
    const { items } = this.state;
    const style = { width: "200px" };
    return (
      <div style={style}>
        {items.map((i, ind) => (
          <Card
            key={i.id}
            id={i.id}
            text={i.text}
            index={ind}
            moveItem={this.moveItem}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Multiselect);
