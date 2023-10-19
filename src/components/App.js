import React from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from './Headquarters';
import WestworldMap from "./WestworldMap";
import { useState, useEffect } from "react";

function App() {

  const [area, setArea] = useState([]);
  const [host, setHost] = useState([]);
  const [selectedHost, setSelectedHost] = useState('');

  const areaFetchAPI = 'http://localhost:3001/areas';
  const hostsFetchAPI = 'http://localhost:3001/hosts';

  useEffect(()=>{
    Promise.all([
      fetch(areaFetchAPI).then(response => response.json()).then((areas) => {
        setArea(areas)
      }),
      fetch(hostsFetchAPI).then(response => response.json()).then((hosts) => {
        setHost(hosts)
      }) 
    ])
  },[]);

  //makes host profile appear on detail screen
  function onSelectHost(host){
    setSelectedHost(host);
  }

  function onAlterHostStatus(altedAgentData, alteredAgentId){
    setHost(host.map((agent) => {
      const {id} = agent;
      if(alteredAgentId === id){
        return altedAgentData;
      }
      return agent;
    }))
  }

  //PATCH request to update host profile
  //UNDER CONTRUCTION!!!!!
  function alterHostStatus(confirmationForm, id){
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
      onAlterHostStatus(data,id);
      onSelectHost(data);
    });
  }

  return (
    <Segment id="app">
      <WestworldMap areas={area} hosts={host} onSelectHost={onSelectHost}/>
      <Headquarters areas={area} hosts={host} onSelectHost={onSelectHost} selectedHost={selectedHost} alterHostStatus={alterHostStatus}/>
    </Segment>
  );
}

export default App;
