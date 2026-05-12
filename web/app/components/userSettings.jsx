import { 
    Text, 
    Grid, 
    Button,
    Flex  //Remove this
} from '@mantine/core';

function UserSettings() {
    return (
        <>

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
            <h1>View Reports Button</h1>
            <h1>User Settings</h1>
            <Grid grow="" bg="gray" mt="50" mih="300">
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={2} bg="orange" mih="100" style={{display: "flex", alignItems: "flex-start", flexDirection: "column", }} pl="10">
                    <Text>Name:</Text> 
                    <Text>Herman Larsson</Text> 
                </Grid.Col>

                <Grid.Col span={2} bg="pink" mih="100" style={{display: "flex", alignItems: "flex-start", flexDirection: "column", }} pl="10" >
                    <Text>Bedtime: </Text> 
                    <Text>21:00 </Text> 
                </Grid.Col>
                <Grid.Col span={7}></Grid.Col>

                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={2} bg="pink" mih="100" style={{display: "flex", alignItems: "flex-start", flexDirection: "column", }} pl="10" >
                    <Text>Date Of Birth: </Text> 
                    <Text>1931-01-01</Text> 
                </Grid.Col>

                <Grid.Col span={2} bg="orange" mih="100" style={{display: "flex", alignItems: "flex-start", flexDirection: "column", }} pl="10" >
                    <Text>Tracking Length: </Text> 
                    <Text>60 min </Text> 
                </Grid.Col>
                <Grid.Col span={7}></Grid.Col>

                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={2} bg="pink" mih="100" style={{display: "flex", alignItems: "flex-start", flexDirection: "column", }} pl="10" >
                    <Text>Edit Button </Text> 
                </Grid.Col>

            </Grid> 
        </>
    );
}

export default UserSettings;    