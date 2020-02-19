import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import React from 'react';
import styled from 'styled-components';

const ItemGroup = styled.p`
    font-size: 22px;
    font-weight: bold;
`;


const WizardFormWrap = styled.div`
    margin-top: 100px;
    h1 {
        font-size: 50px;
    }
`;

const PageError = ({homePage}: any) => {
        return (
            <WizardFormWrap>
                <WizardForm
                    header={'Your are not allowed to continue'}
                    nextButtonClick={homePage}
                    nextButtonText={'Home'}
                    child={
                        <div>
                            <ItemGroup>Go to home page via button.</ItemGroup>
                        </div>
                    }/>
            </WizardFormWrap>
        );
};

export default PageError;
