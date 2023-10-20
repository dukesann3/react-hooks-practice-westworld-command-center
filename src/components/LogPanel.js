import React from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({activateState, alterAllHostActiveStatus, log}) {

  async function onAlterAllHostActiveStatus(){
    await alterAllHostActiveStatus();
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {log.map((logQ, i) => (
          <p key={i} className={logQ.type}>
            {logQ.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button fluid color={"red"} content={activateState ? "DECOMMISSION ALL" : "ACTIVATE ALL"} onClick={async () => onAlterAllHostActiveStatus()}/>
    </Segment>
  );
}

export default LogPanel;
