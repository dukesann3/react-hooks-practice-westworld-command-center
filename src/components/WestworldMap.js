import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area';

function WestworldMap({areas, hosts, onSetSelectedHostId}) {

  return <Segment id="map">{
    areas.map((area) => {
      return <Area key={area.id} area={area} hosts={hosts} onSetSelectedHostId={onSetSelectedHostId}/>
    })
  }</Segment>;
}

export default WestworldMap;
