import React from 'react';
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';
import styled from 'styled-components';
import { WizardFormWrap } from "../../constants/globalStyledComponents";

const Paragraph = styled.p`
    font-size: 18px;
`;

const Welcome = ({nextPage}: any) => {
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Welcome to the Maternity Leave Application'}
                nextButtonClick={nextPage}
                nextButtonText={'Next'}
                child={
                    <div>
                        <Paragraph>Check if you can get leave or pay when you have a child</Paragraph>
                    </div>
                }/>
        </WizardFormWrap>
    );
}

export default Welcome;
