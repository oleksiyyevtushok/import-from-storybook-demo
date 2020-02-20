import WizardForm from "@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm";
import React from 'react';
import { ItemGroup, WizardFormWrap } from "../../constants/globalStyledComponents";

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
