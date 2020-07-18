import * as React from 'react';
import { useState, useEffect } from 'react';
import { svg, geoOrthographic, geoPath, json } from 'd3';
import geoJSON from '../../../utility/geoData.json';

interface GlobeIProps {}

interface MapState {
  rotation: [number, number, number];
  length: number;
  width: number;
}

const Globe: React.SFC<GlobeIProps> = (props) => {
  const [state, setState] = useState<MapState>({
    rotation: [0, 0, 0],
    length: 200,
    width: 200,
  });

  // let projection = geoOrthographic()
  //   .fitSize([state.width, state.height], geoJSON)
  //   .rotate(state.rotation);

  // let geoGenerator = geoPath().projection(projection);

  // let pathString = geoGenerator(geoJSON);

  // window.requestAnimationFrame(() => {
  //   setState({
  //     rotation: state.rotation + 0.2,
  //   });
  // });

  return <svg width={state.width} height={state.length}></svg>;
};
