import ButtonBack from "@itera-storybook/button-back/lib/ButtonBack";
import ButtonDefault from "@itera-storybook/button-default/lib/ButtonDefault";
import Form from "@itera-storybook/form/lib/Form";
import FormInput from "@itera-storybook/input/lib/FormInput";
import React from 'react';
import styled from 'styled-components';


const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    
    button {
        border: none;
    }
`

const IsDisabled = styled.span<{ disabled?: boolean }>`
    ${({disabled}) => disabled && `
        pointer-events:none;
        opacity: 0.7;
    `}
`

const StyledFormInput = styled.div`
  @media (max-width: 950px) {
        div {
        width: 90%;
    }
  }

`


const PageTwo = ({nextPage, prevPage, setCalculations}: any) => {
    const [ssn, setSSN] = React.useState('');
    const onChange = (e: any) => {
        setSSN(e.target.value);
    }
    const onSubmit = () => {
        nextPage();
        setCalculations(ssn);
    }
    return (
        <div>
            <Form
                header={'Maternity Leave Calculator'}
                child={
                    <>
                        <StyledFormInput><FormInput
                            withIcon
                            iconColor={'darkorange'}
                            placeholder={'Enter your SSN...'}
                            header={'To calculate fill the input please.'}
                            onChange={onChange}
                        /></StyledFormInput>
                        <ButtonGroup>
                            <ButtonBack onClick={prevPage} buttonText={'Back'}/>
                            <IsDisabled disabled={ssn.trim().length < 1}>
                                <ButtonDefault
                                    onClick={onSubmit}
                                    buttonText={'Submit'}
                                />
                            </IsDisabled>
                        </ButtonGroup>
                    </>
                }/>
        </div>
    );
}

export default PageTwo;
