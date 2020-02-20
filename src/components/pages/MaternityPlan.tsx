import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import { Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from 'react';
import styled from 'styled-components';
import { overrideMaterialToOrange, WizardFormWrap } from "../../constants/globalStyledComponents";
import { BackEndRequest, EventClickType, PeriodsProps } from "../../types/general";
import DatePicker from "../blocks/DatePicker";
import TextField from "@material-ui/core/TextField";

const WizardWrap = styled(WizardFormWrap)`
    div {
        margin-top: 0;
        margin-bottom: 10px;
        margin-right: 5px;
    }
`;

const DatePickerWrap = styled.div`
    display: flex;
    align-items: baseline;
    ${overrideMaterialToOrange}
`;

const Paragraph = styled.p`
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: rgb(12,149,176)
    font-weight: bold;
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

declare interface MaternityPlanProps {
    nextPage: () => void,
    prevPage: () => void,
    months: number,
    birthDate: string,
    setRequestToBack: (i: BackEndRequest) => void,
    requestToBack: BackEndRequest
};

const MaternityPlan = ({nextPage, prevPage, months, birthDate, requestToBack, setRequestToBack}: MaternityPlanProps) => {
    const birthDateArray: any[] = birthDate.split('.');

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
    };

    return (
        <WizardWrap>
            <WizardForm
                header={'Maternity leave plan'}
                nextButtonClick={onSubmit}
                nextButtonText={'Next'}
                backButtonClick={prevPage}
                backButtonText={'Back'}
                child={
                    <div>
                        <Paragraph>Period 1.</Paragraph>
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
                                onChange={(val: Date) => SetFirstPeriod({...FirstPeriod, EndDate: val})}
                            />
                            <TextField
                                label="Percent"
                                onChange={(val: EventClickType) => SetFirstPeriod({
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
                            <Paragraph>Period 2.</Paragraph>
                            <DatePickerWrap>
                                <DatePicker
                                    label={'Start'}
                                    onChange={(val: Date) => SetSecondPeriod({...SecondPeriod, StartDate: val})}
                                    default={SecondPeriod.StartDate}
                                />
                                <DatePicker label={'End'}
                                            onChange={(val: Date) => SetSecondPeriod({...SecondPeriod, EndDate: val})}
                                            default={SecondPeriod.EndDate}
                                />
                                <TextField
                                    label="Percent"
                                    onChange={(val: EventClickType) => SetSecondPeriod({
                                        ...SecondPeriod,
                                        LeavePercentage: parseInt(val.target.value)
                                    })}
                                />
                            </DatePickerWrap>
                        </>}
                    </div>
                }/>
        </WizardWrap>
    );
};

export default MaternityPlan;
