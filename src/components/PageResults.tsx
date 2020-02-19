import { useQuery } from "@apollo/react-hooks";
import React from 'react';
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';
import styled from 'styled-components';
import { getResult, test } from "../service/query";

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

const PageResults = ({homePage,requestToBack}: any) => {
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
        console.log('data.calculateFinalAmount',data.calculateFinalAmount)
        console.log('data', test(requestToBack))
        return (
            <WizardFormWrap>
                <WizardForm
                    header={'Summary'}
                    nextButtonClick={homePage}
                    nextButtonText={'Home'}
                    child={
                        <div>
                            {Periods.map((item: any) => (
                                <>
                                    {!!item.StartDate && <ItemGroup>Start of period: <ItemValue>{item.StartDate}</ItemValue></ItemGroup>}
                                    {!!item.EndDate && <ItemGroup>End of period: <ItemValue>{item.EndDate}</ItemValue></ItemGroup>}
                                    <hr/>
                                    {!!item.AmountNet &&<ItemGroup>Amount Net: <ItemValue>{item.AmountNet.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                    {!!item.AmountGross &&<ItemGroup>Amount Gross: <ItemValue>{item.AmountGross.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                    {!!item.PensionFond &&<ItemGroup>Pension Fond: <ItemValue>{item.PensionFond.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                    {!!item.PensionSavings &&<ItemGroup>Pension savings: <ItemValue>{item.PensionSavings.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                    <hr/>
                                    {!!item.Tax.Total &&<ItemGroup>Total tax: <ItemValue>{item.Tax.Total.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                    {!!item.Tax.RateSelected &&<ItemGroup>RateSelected: <ItemValue>{item.Tax.RateSelected} %</ItemValue></ItemGroup>}
                                    {!!item.Tax.Discount && <ItemGroup>Discount: <ItemValue>{item.Tax.Discount} kr.</ItemValue></ItemGroup>}
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
