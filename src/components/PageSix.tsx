import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import { Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import withStyles from "@material-ui/core/styles/withStyles";
import React from 'react';
import styled from 'styled-components';
import DatePicker from "./DatePicker";
import TextField from "@material-ui/core/TextField";

declare interface PeriodsProps {
    LeavePercentage: number,
    StartDate: Date,
    EndDate: Date | null,
}

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

const ButtonStyled = withStyles({
    root: {
        color: 'white',
        background: 'rgb(12,149,176)',
        '&:hover': {
            background: 'rgb(10,116,137)'
        }
    },
})(Button);

const formatDate = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + '.' + month + '.' + year;
}


const PageSix = ({nextPage, prevPage, months, birthDate, requestToBack, setRequestToBack}: any) => {
    const birthDateArray: number[] & string[] = birthDate.split('.');

    const firstPeriodStart: Date = new Date(birthDateArray[2], birthDateArray[1], birthDateArray[0]);
    const firstPeriodEnd: Date = new Date(birthDateArray[2], parseInt(birthDateArray[1]) + months, birthDateArray[0]);

    const [expandPeriods, toggleExpand] = React.useState<boolean>(false);
    const [FirstPeriod, SetFirstPeriod] = React.useState<PeriodsProps>({
        LeavePercentage: 0,
        StartDate: firstPeriodStart,
        EndDate: firstPeriodEnd,
    });
    const [SecondPeriod, SetSecondPeriod] = React.useState<PeriodsProps>({
        LeavePercentage: 0,
        StartDate: firstPeriodEnd,
        EndDate: null,
    });

    const isPeriodValid = (period: PeriodsProps) => {
        return period.LeavePercentage > 0 &&
            period.StartDate &&
            period.EndDate
    };

    const getPeriodsData = () => {
        const periodsData: PeriodsProps[] = [];
        if (isPeriodValid(FirstPeriod)) {
            periodsData.push(FirstPeriod);
        }
        if (isPeriodValid(SecondPeriod)) {
            periodsData.push(SecondPeriod);
        }
        return periodsData;
    };

    const onSubmit = () => {
        setRequestToBack({
            ...requestToBack,
            Periods: getPeriodsData()
        });
        nextPage();
    };

    const expandHandler = () => {
        if(expandPeriods){
            toggleExpand(false);
            SetSecondPeriod({
                LeavePercentage: 0,
                StartDate: firstPeriodEnd,
                EndDate: null,
            });
        } else {
            toggleExpand(true);
        }
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
                            <DatePicker
                                disabled
                                label={'Start'}
                                default={FirstPeriod.StartDate}
                                onChange={(val: Date) => SetFirstPeriod({...FirstPeriod, StartDate: val})}
                            />
                            <DatePicker
                                label={'End'}
                                default={FirstPeriod.EndDate}
                                onChange={(val: any) => SetFirstPeriod({...FirstPeriod, EndDate: val})}
                            />
                            <TextField
                                label="Percent"
                                onChange={(val: any) => SetFirstPeriod({
                                    ...FirstPeriod,
                                    LeavePercentage: parseInt(val.target.value)
                                })}
                            />
                        </DatePickerWrap>
                        <ButtonStyled
                            variant="contained"
                            onClick={expandHandler}
                        >
                            {expandPeriods ? 'Remove' : 'Add'}
                        </ButtonStyled>
                        {expandPeriods &&
                        <>
                            <Paragraph style={{fontWeight: 'bold'}}>Period 2.</Paragraph>
                            <DatePickerWrap>
                                <DatePicker
                                    label={'Start'}
                                    onChange={(val: any) => SetSecondPeriod({...SecondPeriod, StartDate: val})}
                                    default={SecondPeriod.StartDate}
                                />
                                <DatePicker label={'End'}
                                            onChange={(val: any) => SetSecondPeriod({...SecondPeriod, EndDate: val})}
                                            default={SecondPeriod.EndDate}
                                />
                                <TextField
                                    label="Percent"
                                    onChange={(val: any) => SetSecondPeriod({
                                        ...SecondPeriod,
                                        LeavePercentage: parseInt(val.target.value)
                                    })}
                                />
                            </DatePickerWrap>
                        </>}
                    </div>
                }/>
        </WizardFormWrap>
    );
}

export default PageSix;
