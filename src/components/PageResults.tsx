import { useQuery } from "@apollo/react-hooks";
import React from 'react';
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';
import styled from 'styled-components';
import { getResult } from "../service/query";

const ItemGroup = styled.p`
    font-size: 22px;
    font-weight: bold;
`;


const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
`;

const ItemValue = styled.span`
    color: rgb(12, 149, 176);
    font-weight: normal;
`;

const Paragraph = styled.p`
    font-size: 18px;
`;

const PageResults = ({nextPage,requestToBack}: any) => {
    const {
        data,
        loading,
        error
    } = useQuery(getResult(requestToBack));
    if(data){
        const {
            SSN,
            Periods
        } = data.calculateFinalAmount;
        console.log('Periods', Periods)
        return (
            <WizardFormWrap>
                <WizardForm
                    header={'Result of calculations'}
                    nextButtonClick={nextPage}
                    nextButtonText={'Next'}
                    child={
                        <div>
                            {Periods.map((item: any) => (
                                <>
                                    {item.StartDate && <ItemGroup>Start of period: <ItemValue>{item.StartDate}</ItemValue></ItemGroup>}
                                    {item.EndDate && <ItemGroup>End of period: <ItemValue>{item.EndDate}</ItemValue></ItemGroup>}
                                    <hr/>
                                    {item.AmountNet &&<ItemGroup>Amount Net: <ItemValue>{item.AmountNet} kr.</ItemValue></ItemGroup>}
                                    {item.AmountGross &&<ItemGroup>Amount Gross: <ItemValue>{item.AmountGross} kr.</ItemValue></ItemGroup>}
                                    {item.PensionFond &&<ItemGroup>Pension Fond: <ItemValue>{item.PensionFond} kr.</ItemValue></ItemGroup>}
                                    {item.PensionSavings &&<ItemGroup>Pension Fond: <ItemValue>{item.PensionSavings} kr.</ItemValue></ItemGroup>}
                                    <hr/>
                                    {item.Tax.Total &&<ItemGroup>Pension savings: <ItemValue>{item.Tax.Total} %</ItemValue></ItemGroup>}
                                    {item.Tax.RateSelected &&<ItemGroup>RateSelected: <ItemValue>{item.Tax.RateSelected} %</ItemValue></ItemGroup>}
                                    {item.Tax.Discount &&<ItemGroup>Discount: <ItemValue>{item.Tax.Discount} %</ItemValue></ItemGroup>}
                                </>
                            ))}
                        </div>
                    }/>
            </WizardFormWrap>
        );
    } else {
        return <div></div>
    }
}

export default PageResults;
