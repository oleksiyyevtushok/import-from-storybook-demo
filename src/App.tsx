import FormInput from "@itera-storybook/input/lib/FormInput";
import React from 'react';
import Button from '@itera-storybook/button/';
import ButtonBack from "@itera-storybook/button-back/lib/ButtonBack";
import ButtonDefault from "@itera-storybook/button-default/lib/ButtonDefault";
import Range from "@itera-storybook/range/lib/Range";
import Form from "@itera-storybook/form/lib/Form";
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
    'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim ' +
    'id est laborum.';

function App() {
  return (
    <div className="App">
      <Button/>
      <ButtonBack onClick={() => alert('click')} buttonText={'Click'}/>
      <ButtonDefault onClick={() => alert('click')} buttonText={'Click'}/>
        <div style={{width: '50%', marginLeft: "40px"}}>
            <Range max={10} />
        </div>
        <Form
            header={'Maternity Leave Calculator'}
            child={
                <>
                    <FormInput
                        withIcon
                        iconColor={'darkorange'}
                        placeholder={'Enter your SSN...'}
                        header={'To calculate fill the input please.'}
                    />
                    <ButtonDefault onClick={() => console.log('Submitted')} buttonText={'Submit'}/>
                </>
            }/>
        <div style={{marginTop: "50px"}}>
            <WizardForm
                header={'Wizard form example of header'}
                nextButtonClick={() => console.log('next')}
                nextButtonText={'Next'}
                backButtonClick={() => console.log('back')}
                backButtonText={'Back'}
                child={
                    <div >
                        <div>{loremIpsum}</div>
                        <Range max={12}/>
                    </div>
                }/>
        </div>
    </div>
  );
}

export default App;
