import { Select } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

function ReportDropdown() {
    const [rawAvailableDates, setRawAvailableDates] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const navigate = useNavigate();

    //Fetches all dates available from logged in user
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
            <h1>View Reports</h1>
            <Select
                variant="filled"
                placeholder="Choose a date to view report"
                searchable
                maxDropdownHeight={100}
                data={availableDates}      
                onChange={(date) => navigate("../report/" + date)}          
            />
        </>
    )
}
export default ReportDropdown;    