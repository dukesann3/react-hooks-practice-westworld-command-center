
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({ selectedHost, alterHostStatus, areas }) {

  const { firstName, active, imageUrl, gender, area, id } = selectedHost;

  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  //const [click, setClick] = useState(active);

  const value = area;

  const options = areas.map((area) => {
    const { name } = area;
    const nameWithNoUnderScore = name.replace('_', ' ');
    return { key: name, text: nameWithNoUnderScore, value: name }
  });

  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    const changeAreaForm = {
      area: value
    }
    alterHostStatus(changeAreaForm, id);
  }

  function handleRadioChange() {
    //change active status...
    const activeStatusForm = {
      active: !active
    }
    //--> patch request from props here!!!
    alterHostStatus(activeStatusForm, id);
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={active ? 'active' : 'Decommissioned'}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area: {area.replace('_',' ')}
            <Dropdown
              onChange={handleOptionChange}
              value={value}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
