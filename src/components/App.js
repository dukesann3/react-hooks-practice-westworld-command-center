import React from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from './Headquarters';
import WestworldMap from "./WestworldMap";
import { useState, useEffect } from "react";
import { Log } from "../services/Log";

function App() {

  const [area, setArea] = useState([]);
  const [host, setHost] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState(null);
  const [activateState, setActivateState] = useState(false);
  const [log, setLog] = useState([Log.notify('Booted agent distribution software beep beep boop')]);

  const areaFetchAPI = 'http://localhost:3001/areas';
  const hostsFetchAPI = 'http://localhost:3001/hosts';

  useEffect(() => {
    Promise.all([
      fetch(areaFetchAPI).then(response => response.json()).then((areas) => {
        setArea(areas);
        console.log('re-rendered?')
      }),
      fetch(hostsFetchAPI).then(response => response.json()).then((hosts) => {
        setHost(hosts)
      })
    ])
  }, [activateState]);

  //makes host profile appear on detail screen
  function onSelectHostId(id) {
    setSelectedHostId(id);
  }

  function onAlterHostStatus(altedAgentData, alteredAgentId) {
    setHost(host.map((agent) => {
      const { id } = agent;
      if (alteredAgentId === id) {
        return altedAgentData;
      }
      return agent;
    }))
  }

  //PATCH request to update host profile
  function alterHostStatus(confirmationForm, id) {
    const jsonedForm = JSON.stringify(confirmationForm);
    const hostsFetchAPIPatch = hostsFetchAPI + `/${id}`
    fetch(hostsFetchAPIPatch, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonedForm
    })
      .then(response => response.json())
      .then((data) => {
        onAlterHostStatus(data, id);
      });
  }

  function onActivateState() {
    setActivateState(!activateState);
  }

  function addLog(newLog) {
    setLog([...log, newLog]);
  }

  function alterAllHostActiveStatus() {
    //allows only members who are currently in the future activation state to not be patched.
    const hostsToBeCorrected = host.filter((agent) => agent.active === activateState);
    Promise.all(hostsToBeCorrected.map((agent) => {
      const { id } = agent;
      const hostsFetchAPIPatch = hostsFetchAPI + `/${id}`;
      const confirmationForm = {
        active: !activateState
      }
      const jsonedForm = JSON.stringify(confirmationForm);
      return fetch(hostsFetchAPIPatch, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonedForm
      })
        .then(response => {
          return response.json();
        })
        .then((updatedAgent) => {
          onAlterHostStatus(updatedAgent, id);
        })
        .catch(error => {
          throw error;
        })
    }))
      .then(() => {
        onActivateState();
        addLog(Log.warn(!activateState ? 'All agents deployed' : 'All agents decommissioned'));
      })
      .catch((error) => {
        throw error;
      })
  }

  return (
    <Segment id="app">
      <WestworldMap areas={area} hosts={host} onSetSelectedHostId={onSelectHostId} />
      <Headquarters areas={area}
        hosts={host}
        selectedHostId={selectedHostId}
        onSetSelectedHostId={onSelectHostId}
        alterHostStatus={alterHostStatus}
        onActivateState={onActivateState}
        activateState={activateState}
        alterAllHostActiveStatus={alterAllHostActiveStatus}
        addLog={addLog}
        log={log}
      />
    </Segment>
  );
}

export default App;
