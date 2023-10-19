import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from './HostInfo';

function Details({selectedHost, alterHostStatus, areas }) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  return (
    <Segment id="details" className="HQComps">
      {!selectedHost ? <Image size="medium" src={Images.westworldLogo} /> : <HostInfo selectedHost={selectedHost} alterHostStatus={alterHostStatus} areas={areas}/>}
    </Segment>
  );
}

export default Details;
