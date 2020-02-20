import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import React from 'react';
import styled from 'styled-components';
import { additionalQuestions, booleanValues, workValues } from "../../constants/defaultValues";
import { WizardFormWrap } from "../../constants/globalStyledComponents";
import { BackEndRequest, GetSSNResponse } from "../../types/general";
import { RadioButton } from "../blocks/RadioButton";

const Question = styled.p`
    font-size: 22px;
    font-weight: 500;
`;

const StyledContent = styled.div`
    div {
        margin-top: 0;
        margin-bottom: 0;
    }
`;

declare interface AdditionalInfoProps {
    nextPage: () => void,
    prevPage: () => void,
    queryResults: GetSSNResponse,
    setRequestToBack: (i: BackEndRequest) => void,
    requestToBack: BackEndRequest,
    setError: (i: boolean) => void
};

const AdditionalInfo = ({nextPage, prevPage, queryResults, requestToBack, setRequestToBack, setError}: AdditionalInfoProps) => {
    const {
        HasIncomes,
        SSN
    } = queryResults;
    const [WorkingType, setWorkingType] = React.useState<string | null>(null);
    const [IsFullTimeEducation, setFullTimeEducation] = React.useState<boolean | string>('noData');
    const [HasLegalDomicile, setHasLegalDomicile] = React.useState<boolean>(false);

    const onSubmit = () => {
        if (!IsFullTimeEducation && !HasLegalDomicile) {
            setError(true);
        } else {
            setRequestToBack({
                ...requestToBack,
                SSN,
                WorkingType: HasIncomes ? WorkingType : HasLegalDomicile ? 'OutOfLabor' : 'Education'
            });
            nextPage();
        }
    };
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Additional data'}
                nextButtonClick={onSubmit}
                nextButtonText={'Next'}
                backButtonClick={prevPage}
                backButtonText={'Back'}
                child={
                    <StyledContent>
                        {HasIncomes ?
                            <>
                                <Question>{additionalQuestions.domestic}</Question>
                                <RadioButton
                                    setRadioResult={(val: string) => setWorkingType(val)}
                                    values={workValues}
                                />
                            </> :
                            <>
                                <Question>{additionalQuestions.education}</Question>
                                <RadioButton setRadioResult={(val: string) => setFullTimeEducation(val === 'true')}
                                             values={booleanValues}
                                />
                                {!IsFullTimeEducation &&
                                <>
                                    <Question>{additionalQuestions.legalDomicile}</Question>
                                    <RadioButton
                                        setRadioResult={(val: string) => setHasLegalDomicile(val === 'true')}
                                        values={booleanValues}
                                    />
                                </>}
                            </>}

                    </StyledContent>
                }/>
        </WizardFormWrap>
    );
};

export default AdditionalInfo;
