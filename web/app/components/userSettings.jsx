import { 
    Text, 
    Grid, 
    Button,
    TextInput,
    Flex  //TODO:Remove this if not used
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

//TODO: Make it get user stuff
const initialLabels = [
    { label: "Name:", value: ""},
    { label: "Date of Birth:", value: ""},
    { label: "Bedtime:", value: ""},
    { label: "Tracking Length (min):", value: ""},
] 

function UserSettings() {
    const [value, setValue] = useState("");
    const [labels, setLabels] = useState(initialLabels);
    const [tmpLabels, setTmpLabels] = useState([]);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const buffer = [...initialLabels];
        fetch("../api/user/details")
          .then((res) => res.json())
          .then((data) => {
            buffer[0] = {... buffer[0], value: `${data[0]["fname"]} ${data[0]["mname"]} ${data[0]["lname"]}`};
            buffer[1] = {... buffer[1], value: data[0]["dob"]};
            buffer[2] = {... buffer[2], value: data[0]["bedtime"]};
            buffer[3] = {... buffer[3], value: data[0]["tracking_length"]};
            setLabels(buffer);
          })
    }, []);

    const handelChange = (index, newValue) => {
        const updatedLabels = [...tmpLabels];
        updatedLabels[index] = { ...updatedLabels[index], value: newValue};
        setTmpLabels(updatedLabels);
    }

    const handleSave = () => {
        const result = tmpLabels.every(checkLabels);

        if (result) {
            setLabels(tmpLabels);
            setEditing(false);
        } 
    }

    function checkLabels(item, index, arr) {
        const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+){1,2}$/; //Allows for "fname lname" or "fname mname lnaem"
        const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; //Allows for "YYYY-MM-DD"
        const bedtimeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/; //Allows for "HH:MM:SS"
        const trackingRegex = /^\d+$/; //Allows for any string of only numbers
        
        if (index == 0 && !nameRegex.test(item.value)) { //Checking name
                if (item.value == "") {
                    item.value = labels[index].value;
                    return true;
                }
                alert(`${item.value} not a valid name.\nName must includes: Firstname, Middlename (optional), Lastname`)
                return false
        }

        else if (index == 1 && !dobRegex.test(item.value)) { //Checking Date of Birth
                if (item.value == "") {
                    item.value = labels[index].value;
                    return true;
                }
                alert(`${item.value} not a valid date of birth.\nDate of birth follows this format: YYYY-MM-DD`)
                return false
        }

        else if (index == 2 && !bedtimeRegex.test(item.value)) { //Checking Bedtime
                if (item.value == "") {
                    item.value = labels[index].value;
                    return true;
                }
                alert(`${item.value} not a valid bedtime.\nBedtime follows this format: HH:MM:SS`)
                return false
        }

        else if (index == 3 && !trackingRegex.test(item.value)){ //Checking Tracking length
            console.log(item.value);
                if (item.value == "") {
                    item.value = labels[index].value;
                    return true;
                }
                alert(`${item.value} not a valid tracking length.\nTracking length can only be positive whole numbers.`)
                return false
        }
        else {
            console.log(`Value ${item.value} looks good`)
            return true
        }
    }

    return (
    <>
        <h1>User Settings</h1>
        <Grid bg="gray" mt="50" mih="300">
            {labels.map((label, index) => (
                <Grid.Col 
                    key={label.label} 
                    span={3} 
                    bg="orange" 
                    mih="100" 
                    pl="10"
                    style={{ display: "flex", alignItems: "flex-start", flexDirection: "column"}}
                >
                    <Text style={{color: "black"}}>{label.label}</Text>
                    {editing ? (
                        <TextInput
                            defaultValue={label.value}
                            onChange={(newVal) => {handelChange(index, newVal.target.value)}}
                        />
                    ) : (   
                        <Text style={{color: "black"}}>{label.value}</Text>
                    )}                                
                </Grid.Col> 
            ))}
            <Grid.Col
                span={12} pl="10"
            >
                <Button variant="filled" onClick={editing ? handleSave : () => {
                    setTmpLabels([...labels]);
                    setEditing(!editing);
                }}>
                    {editing ? "Save Settings" : "Edit Settings"}
                </Button>
                {editing &&
                    <Button variant="filled" color="red" ml="10" onClick={() => setEditing(!editing)}>
                        Cancel Settings
                    </Button>
                }
            </Grid.Col>
        </Grid>

        {/*<Flex

            mih={500}
            bg="rgba(0, 0, 0, .3)"
            gap="md"
            justify="center"
            align="center"
            wrap="wrap"
        >
            <Text size="sm">Box 1</Text>
        </Flex>
        
        <Flex
  
            mih={500}
            bg="rgba(0, 0, 0, .3)"
            gap="md"
            justify="center"
            align="center"
            wrap="wrap"
        >
            <Text size="sm">Box 2</Text>
        </Flex>*/}
        </>
    );
}

export default UserSettings;    