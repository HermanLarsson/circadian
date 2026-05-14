import { 
    Button,
    Input, 
    InputBase, 
    Combobox, 
    useCombobox,
    Select,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function ReportDropdown() {
    //TODO: Change to find dates from DB
    const [availableDates, setAvailableDates] = useState(["2026-04-20", "2", "3", "4", "5"]);
    const navigate = useNavigate();
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    return (
        <>
            <Select
                label="Dates:"
                placeholder="Pick date"
                searchable
                maxDropdownHeight={100}
                data={availableDates}      
                onChange={(date) => navigate("../report/" + date)}          
            />


            {/*<Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    setValue(val);
                    combobox.closeDropdown();
                    navigate("../report/" + val);
                }}
            >
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents="none"
                        onClick={() => combobox.toggleDropdown()}
                    >
                        {value ?? "View Reports"}
                    </InputBase>
                </Combobox.Target>
                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>*/}
        </>
    )
}
export default ReportDropdown;    