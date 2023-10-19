import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area';

function WestworldMap({areas, hosts, onSelectHost}) {

  return <Segment id="map">{
    areas.map((area) => {
      return <Area key={area.id} area={area} hosts={hosts} onSelectHost={onSelectHost}/>
    })
  }</Segment>;
}

export default WestworldMap;
