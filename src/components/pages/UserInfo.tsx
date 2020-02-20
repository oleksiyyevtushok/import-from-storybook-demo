import { useQuery } from "@apollo/react-hooks";
import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import TextField from "@material-ui/core/TextField";
import React from 'react';
import styled from 'styled-components';
import { ItemGroup, WizardFormWrap, ItemValue } from "../../constants/globalStyledComponents";
import { getSSNQuery } from "../../helpers/query";
import { BackEndRequest, EventClickType, GetSSNResponse } from "../../types/general";

const InputWrapper = styled.span`
    display: inline-flex;
    margin-left: 20px;
    align-items: baseline;
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
`;

declare interface UserInfoProps {
    nextPage: () => void,
    prevPage: () => void,
    ssn: string,
    setQueryResults: (i: GetSSNResponse) => void,
    setRequestToBack: (i: BackEndRequest) => void,
    requestToBack: BackEndRequest
}

const UserInfo = ({nextPage, prevPage, ssn, setQueryResults, setRequestToBack, requestToBack}: UserInfoProps) => {
    const {data} = useQuery(getSSNQuery(ssn));
    const [discount, setDiscount] = React.useState<string | null>(null);
    const [savings, setSavings] = React.useState<string | null>(null);

    if (data) {
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
                                        <InputWrapper>
                                            <TextField
                                                value={savings ? savings : PensionSavings}
                                                onChange={(val: EventClickType) => setSavings(val.target.value)}
                                            />
                                            <ItemValue>%</ItemValue>
                                        </InputWrapper>
                                    </ItemGroup>
                                    <ItemGroup>Personal discount:
                                        <InputWrapper>
                                            <TextField
                                                value={discount ? discount : PersonalDiscount}
                                                onChange={(val: EventClickType) => setDiscount(val.target.value)}
                                            />
                                            <ItemValue>%</ItemValue>
                                        </InputWrapper>
                                    </ItemGroup>
                                </> : (<>
                                        <ItemGroup>Pension
                                            savings: <ItemValue>{PensionSavings} %</ItemValue></ItemGroup>
                                        <ItemGroup>Personal discount:
                                            <InputWrapper>
                                                <TextField
                                                    value={discount ? discount : PersonalDiscount}
                                                    onChange={(val: EventClickType) => setDiscount(val.target.value)}
                                                />
                                                <ItemValue>%</ItemValue>
                                            </InputWrapper>
                                        </ItemGroup>
                                    </>
                                )}
                        </div>
                    }/>
            </WizardFormWrap>
        )
    } else {
        return <div/>
    }
};

export default UserInfo;
