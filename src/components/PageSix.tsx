import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import React from 'react';
import styled from 'styled-components';
import DatePicker from "./DatePicker";
import TextField from "@material-ui/core/TextField";

const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
    h2 {
        font-size: 50px;
        margin-bottom: 20px;
        color: rgb(12, 149, 176);
    }
    div {
        margin-top: 0;
        margin-bottom: 10px;
        margin-right: 5px;
    }
`;

const DatePickerWrap = styled.div`
    display: flex;
    align-items: baseline;
    .MuiGrid-container {
        width: auto !important;
    }
    .MuiInput-underline:before {
        border-bottom: 1px solid darkorange !important;
    }
    .MuiInput-underline:after {
        border-bottom: 2px solid darkorange !important;
    }
    .Mui-focused {
        color: darkorange !important;
    }
`;

const Paragraph = styled.p`
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: rgb(12,149,176)
`;

const formatDate = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + '.' + month + '.' + year;
}


const PageSix = ({nextPage,prevPage, months, birthDate, requestToBack, setRequestToBack}: any) => {
    const birthDateArray = birthDate.split('.');
    const [Periods, setPeriods] = React.useState({
        LeavePercentage: 0,
        StartDate: new Date(birthDateArray[2],birthDateArray[1],birthDateArray[0]),
        EndDate:  new Date(birthDateArray[2], parseInt(birthDateArray[1]) + months,birthDateArray[0]),
    });

    const onSubmit = () => {
        setRequestToBack({
            ...requestToBack,
            Periods:[{
                LeavePercentage:  Periods.LeavePercentage,
                StartDate: formatDate(Periods.StartDate),
                EndDate: formatDate(Periods.EndDate),
            }]
        });
        nextPage();
    }
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Maternity leave plan'}
                nextButtonClick={onSubmit}
                nextButtonText={'Next'}
                backButtonClick={prevPage}
                backButtonText={'Back'}
                child={
                    <div>
                        <Paragraph style={{fontWeight: 'bold'}}>Period 1.</Paragraph>
                        <DatePickerWrap>
                            <DatePicker label={'Start'} onChange={(val: any) => setPeriods({...Periods,StartDate: val})} disabled default={Periods.StartDate}/>
                            <DatePicker label={'End'} onChange={(val: any) => setPeriods({...Periods,EndDate: val})} default={Periods.EndDate}/>
                            <TextField onChange={(val: any) => setPeriods({...Periods,LeavePercentage: parseInt(val.target.value)})} label="Percent" />
                            {/*<IconButton aria-label="add">*/}
                            {/*    <AddIcon />*/}
                            {/*</IconButton>*/}
                        </DatePickerWrap>
                    </div>
                }/>
        </WizardFormWrap>
    );
}

export default PageSix;
