import React from 'react';
import Svg, {
    Circle,
    Ellipse,
    G,
   // Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';

const Matrix = (props: any) => {
    const X1 = props.x1;
    const X2 = props.x2;
    const Y1 = props.y1;
    const Y2 = props.y2;

    const DIV_NUM_X = props.divNumX;
    const DIV_NUM_Y = props.divNumY;

    const WIDTH = X2 - X1;
    const HEIGHT = Y2 - Y1;
    const DIV_X = WIDTH / DIV_NUM_X;
    const DIV_Y = HEIGHT / DIV_NUM_Y;

    let items = [];

    for( let i = 0; i < DIV_NUM_X; i ++){
        items.push(
            <Line x1={X1+i*DIV_X} y1={Y1} x2={X1+i*DIV_X} y2={Y2} stroke="red" strokeWidth="1" />
        )
    }
    for( let i = 0; i < DIV_NUM_Y; i ++){
        items.push(
            <Line x1={X1} y1={Y1+i*DIV_Y} x2={X2} y2={Y1+i*DIV_Y} stroke="red" strokeWidth="1" />
        )
    }
    return items
}
export default Matrix;