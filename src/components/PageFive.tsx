import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import Range from "@itera-storybook/range/lib/Range";
import React from 'react';
import styled from 'styled-components';

const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
    h2 {
        font-size: 50px;
        margin-bottom: 20px;
        color: rgb(12, 149, 176);
    }
`;

const Paragraph = styled.p`
    font-size: 18px;
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


const PageFive = ({nextPage, prevPage, setMon}: any) => {
    const [month, setMonth] = React.useState(1);
    const onSubmit = () => {
        setMon(month)
        nextPage();
    }
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Choose month amount'}
                nextButtonClick={onSubmit}
                nextButtonText={'Next'}
                backButtonClick={prevPage}
                backButtonText={'Back'}
                child={
                    <div>
                        <Paragraph style={{fontWeight: 'bold'}}>You are able to choose period up to 6 months.</Paragraph>
                        <RangeWrapper>
                            <Range onChange={(e: any, val: number) => setMonth(val)} max={6} />
                        </RangeWrapper>
                    </div>
                }/>
        </WizardFormWrap>
    );
}

export default PageFive;
