import { 
    Text, 
    Grid, 
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
        
            <h1>User Settings</h1>
            <Grid grow="" bg="gray" mt="50" mih="300">
                <Grid.Col span={6} bg="yellow" mih="100">Name</Grid.Col>
                <Grid.Col span={6} bg="pink" mih="100">Bedtime</Grid.Col>
                <Grid.Col span={6} bg="green" mih="100">DateOfBirth</Grid.Col>
                <Grid.Col span={6} bg="yellow" mih="100">TrackingLength</Grid.Col>
                <Grid.Col span={6} bg="pink" mih="100">ReportButton</Grid.Col>
                <Grid.Col span={6} bg="green" mih="100">EditButton</Grid.Col>
            </Grid> 
        </>
    );
}

export default UserSettings;    