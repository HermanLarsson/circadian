import { 
    Button,
    Input, 
    InputBase, 
    Combobox, 
    useCombobox,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useState } from 'react';

//TODO: Change to find dates from DB
const availableDates = ["2026-04-20", "2", "3", "4", "5"];

function ReportDropdown() {
    const navigate = useNavigate();
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    
    const [value, setValue] = useState(null);

    const options = availableDates.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
            <Combobox
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
            </Combobox>
    )
}
export default ReportDropdown;    