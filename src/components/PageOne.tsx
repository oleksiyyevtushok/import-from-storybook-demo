import React from 'react';
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';
import styled from 'styled-components';
import DatePicker from './DatePicker'

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
    ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
    ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
    ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
`;

const Paragraph = styled.p`
    font-size: 18px;
`;

const PageOne = ({nextPage}: any) => {
    return (
        <WizardFormWrap>
            <WizardForm
                header={'Welcome to the bla bla bla application'}
                nextButtonClick={nextPage}
                nextButtonText={'Next'}
                child={
                    <div>
                        <Paragraph>{loremIpsum}</Paragraph>
                        <Paragraph>Blalbl fdsfdsll fsdfdslfls sdlfdls flsdfl</Paragraph>
                    </div>
                }/>
        </WizardFormWrap>
    );
}

export default PageOne;
