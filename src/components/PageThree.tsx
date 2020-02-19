import { useQuery } from "@apollo/react-hooks";
import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import TextField from "@material-ui/core/TextField";
import React from 'react';
import styled from 'styled-components';
import { getSSNQuery } from "../service/query";

const ItemGroup = styled.p`
    font-size: 22px;
    font-weight: bold;
`;


const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
`;

const ItemValue = styled.span`
    color: rgb(12, 149, 176);
    font-weight: normal;
`;

const InputWrapper = styled.span`
    display: inline-flex;
    margin-left: 20px;
    align-items: baseline;
    .MuiGrid-container {
        width: auto !important;
    }
    .MuiInput-underline:before {
        border-bottom: 1px solid rgb(12, 149, 176) !important;
    }
    .MuiInput-underline:after {
        border-bottom: 2px solid rgb(12, 149, 176) !important;
    }
    .Mui-focused {
        color: rgb(12, 149, 176) !important;
    }
    div {
        margin-bottom: 0;
        margin-top: 0;
    }
    input {
        font-weight: 400;
        font-size: 22px;
        max-width: 40px;
        color: rgb(12, 149, 176);
    }
`


const PageThree = ({nextPage, prevPage, calculations, setQueryResults, setRequestToBack, requestToBack}: any) => {
    const {
        data,
        loading,
        error
    } = useQuery(getSSNQuery(calculations));
    const [discount, setDiscount] = React.useState(null);
    const [savings, setSavings] = React.useState(null);
    if(data) {
        setQueryResults(data.infoBySSN);
        const {
            SSN,
            Name,
            Address,
            HasIncomes,
            MonthIncome,
            OtherMonthIncome,
            PensionSavings,
            PersonalDiscount,
            ChildEstimateBirthDate
        } = data.infoBySSN;

        const onSubmit = () => {
            setRequestToBack({
                ...requestToBack,
                PensionSavings: savings || PensionSavings,
                PersonalDiscount: discount || PersonalDiscount
            });
            nextPage();
        };

        return (
            <WizardFormWrap>
                <WizardForm
                    header={'Your information is below'}
                    nextButtonClick={onSubmit}
                    nextButtonText={'Next'}
                    backButtonClick={prevPage}
                    backButtonText={'Back'}
                    child={
                        <div>
                            <ItemGroup>SSN: <ItemValue>{SSN}</ItemValue></ItemGroup>
                            <ItemGroup>Name: <ItemValue>{Name}</ItemValue></ItemGroup>
                            <ItemGroup>Address: <ItemValue>{Address}</ItemValue></ItemGroup>
                            <ItemGroup>Child birth date: <ItemValue>{ChildEstimateBirthDate}</ItemValue></ItemGroup>
                            {HasIncomes ?
                            <>
                                <ItemGroup>Month income: <ItemValue>{MonthIncome + OtherMonthIncome} kr.</ItemValue></ItemGroup>
                                <ItemGroup>Pension savings:
                                    <InputWrapper><TextField value={savings ? savings : PensionSavings} onChange={(val: any) => setSavings(val.target.value)} />
                                    <ItemValue>%</ItemValue></InputWrapper>
                                </ItemGroup>
                                <ItemGroup>Personal discount:
                                    <InputWrapper>
                                        <TextField value={discount ? discount : PersonalDiscount} onChange={(val: any) => setDiscount(val.target.value)} />
                                        <ItemValue>%</ItemValue>
                                    </InputWrapper>
                                </ItemGroup>

                            </> : ( <>
                                    <ItemGroup>Pension savings: <ItemValue>{PensionSavings} %</ItemValue></ItemGroup>
                                    <ItemGroup>Personal discount:
                                        <InputWrapper>
                                            <TextField value={discount ? discount : PersonalDiscount} onChange={(val: any) => setDiscount(val.target.value)} />
                                            <ItemValue>%</ItemValue>
                                        </InputWrapper>
                                    </ItemGroup>
                                </>
                                )}
                        </div>
                    }/>
            </WizardFormWrap>
        );
    } else {
        return <div></div>
    };
}

export default PageThree;
