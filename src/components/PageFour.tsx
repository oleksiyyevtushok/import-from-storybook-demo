import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import React from 'react';
import styled from 'styled-components';
import { RadioButton } from "./RadioButton";
import FormInput from "@itera-storybook/input/lib/FormInput";

const Question = styled.p`
    font-size: 22px;
    font-weight: 500;
`;

const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
`;


const StyledContent = styled.div`
    div {
        margin-top: 0;
        margin-bottom: 0 ;
    }
`;

const values = [
    {
        value: 'PartTime',
        label: '25% - 49%'
    },
    {
        value: 'FullTime',
        label: '50% - 100%'
    }
];

const booleanValues = [
    {
        value: 'true',
        label: 'Yes'
    },
    {
        value: 'false',
        label: 'No'
    }
];



const PageFour = ({nextPage, prevPage, queryResults, requestToBack, setRequestToBack, setError}: any) => {
    const {
        HasIncomes,
        SSN
    } = queryResults;
    const [WorkingType, setWorkingType] = React.useState<string | null>(null);
    const [IsFullTimeEducation, setFullTimeEducation] = React.useState<boolean | string>('noData');
    const [HasLegalDomicile, setHasLegalDomicile] = React.useState<boolean>(false);
    console.log('IsFullTimeEducation', IsFullTimeEducation)
    const onSubmit = () => {
        if(!IsFullTimeEducation && !HasLegalDomicile){
            setError(true);
        } else {
            setRequestToBack({
                ...requestToBack,
                SSN,
                WorkingType: HasIncomes ? WorkingType : HasLegalDomicile ? 'OutOfLabour' : 'Education'
            });
            nextPage();
        }
    };
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Please provide answers'}
                nextButtonClick={onSubmit}
                nextButtonText={'Next'}
                backButtonClick={prevPage}
                backButtonText={'Back'}
                child={
                    <StyledContent>
                        {HasIncomes ?
                            <>
                                <Question>Domestic employment rate for 6 months before the expected date of birth
                                    of a child or the time when a child enters the home by adoption or
                                    permanent foster care?</Question>
                                <RadioButton setRadioResult={(val: any) => setWorkingType(val)} values={values}/>
                            </> :
                            <>
                                <Question>Have you been in 75-100% continuous education for at least 6 months in the last 12 months prior to the birth of a child,
                                    prenatal or permanent fetus and meet the requirements for educational progress at that time?</Question>
                                <RadioButton setRadioResult={(val: any) => setFullTimeEducation(val === 'true')} values={booleanValues}/>
                                {!IsFullTimeEducation  &&
                                    <>
                                        <Question>Do you have legal domicile in Iceland on the date of birth of a child,
                                            prenatal or permanent fetus and have you been domiciled in Iceland or in another EEA state
                                            for 12 months prior to that date?
                                        </Question>
                                        <RadioButton setRadioResult={(val: any) => setHasLegalDomicile(val === 'true')} values={booleanValues}/>
                                    </>}
                            </>}

                    </StyledContent>
                }/>
        </WizardFormWrap>
    );
};

export default PageFour;
