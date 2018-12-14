import React from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import {
  ButtonToolbar,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Glyphicon,
  Panel,
  FormGroup,
  FormControl
} from "react-bootstrap";

import "./styles.css";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.demension = {
      width: props.width ? props.width : 600,
      height: props.height ? props.height : 200
    };

    this.title = {
      pencil: props.title && props.title.pencil ? props.title.pencil : "書く",
      erase: props.title && props.title.erase ? props.title.erase : "消す",
      undo: props.title && props.title.undo ? props.title.undo : "戻す",
      trash: props.title && props.title.trash ? props.title.trash : "捨てる",
      savefile:
        props.title && props.title.savefile ? props.title.savefile : "保存",
      openfile:
        props.title && props.title.openfile ? props.title.openfile : "読込"
    };

    this.glyph = {
      pencil: props.glyph && props.glyph.pencil ? props.glyph.pencil : "pencil",
      erase: props.glyph && props.glyph.erase ? props.glyph.erase : "erase",
      undo: props.glyph && props.glyph.undo ? props.glyph.undo : "share-alt",
      trash: props.glyph && props.glyph.trash ? props.glyph.trash : "trash",
      savefile:
        props.glyph && props.glyph.savefile
          ? props.glyph.savefile
          : "save-file",
      openfile:
        props.glyph && props.glyph.openfile ? props.glyph.openfile : "open-file"
    };

    this.brush = {
      color: props.brush && props.brush.color ? props.brush.color : "#000",
      defaultColor:
        props.brush && props.brush.color ? props.brush.color : "#000",
      radius: props.brush && props.brush.radius ? props.brush.radius : 12,
      defaultRadius: props.brush && props.brush.radius ? props.brush.radius : 12
    };
    this.erase = {
      color: props.erase && props.erase.color ? props.erase.color : "#fff",
      radius: props.erase && props.erase.radius ? props.erase.radius : 36
    };
    this.data = null;
  }

  //save時にglobalCompositeOperationがsaveされない為、
  //load時にはerase情報がsource-overでloadされ惜しい感じになる
  render = () => {
    return (
      <Panel>
        <Panel.Body>
          <FormGroup>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={"brush"}
              >
                <ToggleButton
                  value={"brush"}
                  onClick={e => {
                    this.brush.color = this.brush.defaultColor;
                    this.brush.radius = this.brush.defaultRadius;
                    this.refs.canvas.canvas.drawing.getContext(
                      "2d"
                    ).globalCompositeOperation = "source-over";
                    this.setState({ flg: true });
                  }}
                >
                  <Glyphicon glyph={this.glyph.pencil} />
                  {this.title.pencil}
                </ToggleButton>
                <ToggleButton
                  value={"eraser"}
                  onClick={e => {
                    this.brush.color = this.erase.color;
                    this.brush.radius = this.erase.radius;
                    this.refs.canvas.canvas.drawing.getContext(
                      "2d"
                    ).globalCompositeOperation = "destination-out";
                    this.setState({ flg: true });
                  }}
                >
                  <Glyphicon glyph={this.glyph.erase} />
                  {this.title.erase}
                </ToggleButton>
              </ToggleButtonGroup>
              <Button onClick={e => this.refs.canvas.undo()}>
                <Glyphicon
                  glyph={this.glyph.undo}
                  style={{ transform: "scale(-1, 1)" }}
                />
                {this.title.undo}
              </Button>
              <Button onClick={e => this.refs.canvas.clear()}>
                <Glyphicon glyph={this.glyph.trash} />
                {this.title.trash}
              </Button>
              <Button
                onClick={e => {
                  this.data = this.refs.canvas.getSaveData();
                  console.log(this.data);
                }}
              >
                <Glyphicon glyph={this.glyph.savefile} />
                {this.title.savefile}
              </Button>
              <Button
                onClick={e => this.refs.canvas.loadSaveData(this.data, true)}
              >
                <Glyphicon glyph={this.glyph.openfile} />
                {this.title.openfile}
              </Button>
              <Button
                onClick={e => {
                  console.log(this.refs.canvas);
                  console.log("----------");
                  console.log(this.refs.canvas.canvas);
                  console.log("----------");
                  console.log(
                    this.refs.canvas.canvas.drawing.getContext("2d")
                      .globalCompositeOperation
                  );
                }}
              >
                Check
              </Button>
            </ButtonToolbar>
            <FormControl
              type="text"
              defaultValue={this.brush.radius}
              onBlur={e => {
                this.brush.radius = e.target.value;
                this.setState({ flg: true });
              }}
            />
          </FormGroup>

          <CanvasDraw
            style={{
              boxShadow:
                "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
            }}
            lazyRadius={0}
            brushColor={this.brush.color}
            brushRadius={this.brush.radius}
            canvasWidth={this.demension.width}
            canvasHeight={this.demension.height}
            ref="canvas"
          />
        </Panel.Body>
      </Panel>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
