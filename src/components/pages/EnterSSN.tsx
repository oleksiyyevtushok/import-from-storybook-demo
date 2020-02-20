import ButtonBack from "@itera-storybook/button-back/lib/ButtonBack";
import ButtonDefault from "@itera-storybook/button-default/lib/ButtonDefault";
import Form from "@itera-storybook/form/lib/Form";
import FormInput from "@itera-storybook/input/lib/FormInput";
import React from 'react';
import styled from 'styled-components';
import { EventClickType } from "../../types/general";

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
`;

const IsDisabled = styled.span<{ disabled?: boolean }>`
    ${({disabled}) => disabled && `
        pointer-events:none;
        opacity: 0.7;
    `}
`;

const StyledFormInput = styled.div`
  @media (max-width: 950px) {
        div {
        width: 90%;
    }
  }
`;

declare interface EnterSSNProps {
    nextPage: () => void,
    prevPage: () => void,
    setSSNValue: (val: string) => void,
}

const EnterSSN = ({nextPage, prevPage, setSSNValue}: EnterSSNProps) => {
    const [ssn, setSSN] = React.useState<string>('');
    const onChange = (e: EventClickType) => {
        setSSN(e.target.value);
    };
    const onSubmit = () => {
        nextPage();
        setSSNValue(ssn);
    };

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
                            header={'To calculate fill your SSN.'}
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

export default EnterSSN;
