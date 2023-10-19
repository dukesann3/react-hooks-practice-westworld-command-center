import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import LogPanel from './LogPanel'
import ColdStorage from "./ColdStorage";

function Headquarters({hosts, onSelectHost, selectedHost, alterHostStatus, areas}) {

  return (
    <Grid celled="internally">
      <Grid.Column width={6}><ColdStorage hosts={hosts} onSelectHost={onSelectHost}/></Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost={selectedHost} alterHostStatus={alterHostStatus} areas={areas}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
