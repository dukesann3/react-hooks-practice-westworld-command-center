import React from "react";
import { Card } from "semantic-ui-react";
import Host from './Host'

function HostList({hosts, isArea, areaName, onSelectHost}) {

  //returns Host on Area where they are assigned
  function hostsOnMap(){
    return hosts.map((host) => {
      const {area, active, id} = host;
      if(area === areaName && active){
        return <Host key={id} host={host} onSelectHost={onSelectHost}/>
      }
      return null;
    })
  }

  //returns everything on headquarters
  //if not active, appear on Cold Storage
  function hostsOnHeadquarters(){
    return hosts.map((host) => {
      const {active, id} = host;
      if(!active){
        return <Host key={id} host={host} onSelectHost={onSelectHost}/>
      }
      return null;
    })
  }

  return (
    <Card.Group itemsPerRow={8}>
      {
        isArea ? hostsOnMap() : hostsOnHeadquarters()
      }
    </Card.Group>
  );
}

export default HostList;
