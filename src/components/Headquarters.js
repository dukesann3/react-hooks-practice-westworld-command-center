import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import LogPanel from './LogPanel'
import ColdStorage from "./ColdStorage";

function Headquarters({hosts, alterHostStatus, areas, onActivateState, activateState, alterAllHostActiveStatus, selectedHostId, onSetSelectedHostId, addLog, log}) {

  return (
    <Grid celled="internally">
      <Grid.Column width={6}><ColdStorage hosts={hosts} onSetSelectedHostId={onSetSelectedHostId}/></Grid.Column>
      <Grid.Column width={5}>
        <Details alterHostStatus={alterHostStatus} areas={areas} selectedHostId={selectedHostId} hosts={hosts} addLog={addLog}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel onActivateState={onActivateState} activateState={activateState} alterAllHostActiveStatus={alterAllHostActiveStatus} log={log}/>
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
