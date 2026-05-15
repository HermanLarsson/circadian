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
    const [tmpLabels, setTmpLabels] = useState(labels);
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
        console.log(result);

        if (result) {
            setLabels(tmpLabels);
            setEditing(false);
        } 
    }

    function checkLabels(item, index, arr) {

        return true
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
                            onChange={(newVal) => {if (newVal.target.value == "") {
                                    console.log(labels[index].label + " can't be empty")
                                }
                                else {
                                    handelChange(index, newVal.target.value)}
                                }
                            }
                        />
                    ) : (   
                        <Text style={{color: "black"}}>{label.value}</Text>
                    )}                                
                </Grid.Col> 
            ))}
            <Grid.Col
                span={12} pl="10"
            >
                <Button variant="filled" onClick={editing ? handleSave : () => setEditing(!editing)}>
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