import { 
    Text, 
    Grid, 
    Button,
    Flex  //TODO:Remove this if not used
} from '@mantine/core';
import { useNavigate } from 'react-router';

//TODO: Make it get user stuff
const labels = [
    { label: "Name:", value: "ADD NAME QUERY"},
    { label: "Bedtime:", value: "ADD BEDTIME QUERY"},
    { label: "Date of Birth:", value: "ADD DATE QUERY"},
    { label: "Tracking Length:", value: "ADD TRACKING LENGTH QUERY"},
] 

function UserSettings() {
    return (
    <>
        <h1>User Settings</h1>
        <Grid bg="gray" mt="50" mih="300">
            {labels.map((label) => (
                <Grid.Col 
                    key={label.label} 
                    span={3} 
                    bg="orange" 
                    mih="100" 
                    pl="10"
                    style={{ display: "flex", alignItems: "flex-start", flexDirection: "column"}}
                    >
                    <Text style={{color: "black"}}>{label.label}</Text>
                    <Text style={{color: "black"}}>{label.value}</Text>
                </Grid.Col> 
            ))}
            <Grid.Col
                span={12} pl="10"
            >
                <Button variant="filled">Edit Settings</Button>
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