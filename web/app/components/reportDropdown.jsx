import { 
    Button,
    Input, 
    InputBase, 
    Combobox, 
    useCombobox,
    Select,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';

function ReportDropdown() {
    const [rawAvailableDates, setRawAvailableDates] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const navigate = useNavigate();

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    useEffect(() => {

        fetch("../api/report/all/dates")
          .then((res) => res.json())
          .then((data) => {
            let buffer = [];
            if (data.length != 0) {
                for(let i = 0; i < data.length; i++) {
                    if (!(buffer.includes(data[i]["date_recorded"]))) {
                        buffer.push(data[i]["date_recorded"]);
                    }
                }
            setAvailableDates(buffer);
          }});
      }, []);

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
                    console.log(combobox.selectedOptionIndex);
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
                    <Combobox.Options>
                        {availableDates.length != 0 &&
                            availableDates.map((date) => (
                                <Combobox.Option key={date}>
                                    {date["date_recorded"]}
                                </Combobox.Option>
                                ))
                        }
                </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>*/}
        </>
    )
}
export default ReportDropdown;    