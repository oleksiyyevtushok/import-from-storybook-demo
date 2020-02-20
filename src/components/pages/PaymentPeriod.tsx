import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import Range from "@itera-storybook/range/lib/Range";
import React from 'react';
import styled from 'styled-components';
import { WizardFormWrap } from "../../constants/globalStyledComponents";
import { EventClickType } from "../../types/general";

const Paragraph = styled.p`
    font-size: 18px;
    fontWeight: 'bold'
`;

const RangeWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 100px !important;
    
    .MuiSlider-valueLabel {
        left: -10px;
        & > span > span {
            padding-right: 0;
        } 
    }
`;

declare interface PaymentPeriodProps {
    nextPage: () => void,
    prevPage: () => void,
    setMon: (i: number) => void,
}


const PaymentPeriod = ({nextPage, prevPage, setMon}: PaymentPeriodProps) => {
    const [month, setMonth] = React.useState<number>(1);
    const onSubmit = () => {
        setMon(month)
        nextPage();
    }
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Payment period'}
                nextButtonClick={onSubmit}
                nextButtonText={'Next'}
                backButtonClick={prevPage}
                backButtonText={'Back'}
                child={
                    <div>
                        <Paragraph>You are able to choose period up to 6 months.</Paragraph>
                        <RangeWrapper>
                            <Range onChange={(e: EventClickType, val: number) => setMonth(val)} max={6} />
                        </RangeWrapper>
                    </div>
                }/>
        </WizardFormWrap>
    );
}

export default PaymentPeriod;
