import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, onSetSelectedHostId}) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  const {imageUrl} = host;
  return (
    <Card
      className="host selected"
      onClick={() => {
        const {id} = host;
        onSetSelectedHostId(id);
      }}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
