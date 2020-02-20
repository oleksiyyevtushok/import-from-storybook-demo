import { useQuery } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from 'react';
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';
import styled from 'styled-components';
import { getResult } from "../service/query";

const ItemGroup = styled.p`
    font-size: 20px;
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

const PeriodHeader = styled.p`
    font-size: 20px;
    color: darkorange;
    font-weight: bold;
`;

const ButtonStyled = withStyles({
    root: {
        color: 'white',
        background: 'rgb(12,149,176)',
        '&:hover': {
            background: 'rgb(10,116,137)'
        }
    },
})(Button);

const GroupOfLabel = styled.div`
    display: flex;
    align-items: baseline;
    font-size: 20px;
        margin-bottom: 0 !important;
`;

const PageResults = ({homePage,requestToBack}: any) => {
    const {
        data,
        loading,
        error
    } = useQuery(getResult(requestToBack));
    const [isExpanded, setExpanded] = React.useState([false,false]);
    if(data){
        const {
            SSN,
            Periods
        } = data.calculateFinalAmount;
        const setExpandened = (index: any, isExpanded: any) => {
            if(index === 0){
                setExpanded([!isExpanded[index],false]);
            } else {
                setExpanded([false,!isExpanded[index]]);
            }
        }
        return (
            <WizardFormWrap>
                <WizardForm
                    header={'Summary'}
                    nextButtonClick={homePage}
                    nextButtonText={'Home'}
                    child={
                        <div>
                            {Periods.map((item: any, index: number) => (
                                <>
                                    <GroupOfLabel>
                                        <PeriodHeader>Period {index + 1}:</PeriodHeader>
                                        {!isExpanded[index] && <><ItemValue style={{fontWeight: 500, paddingLeft: '10px'}}>{item.StartDate.substring(0, 10)} to {item.EndDate.substring(0, 10)}</ItemValue>
                                        <ItemValue style={{fontWeight: 500,paddingLeft: '10px'}}>| {item.AmountNet.toFixed(2)} kr.</ItemValue></>}
                                    </GroupOfLabel>
                                    <ButtonStyled
                                        style={{marginBottom: '20px'}}
                                        variant="contained"
                                        onClick={() => setExpandened(index,isExpanded)}
                                    >
                                        {isExpanded[index] ? 'Hide' : 'Expand'}
                                    </ButtonStyled>
                                    {isExpanded[index] && <>
                                        <hr/>
                                        {!!item.StartDate && <ItemGroup>Start of period: <ItemValue>{item.StartDate.substring(0, 10)}</ItemValue></ItemGroup>}
                                        {!!item.EndDate && <ItemGroup>End of period: <ItemValue>{item.EndDate.substring(0, 10)}</ItemValue></ItemGroup>}
                                        {!!item.AmountNet &&<ItemGroup>Amount Net: <ItemValue>{item.AmountNet.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                        {!!item.AmountGross &&<ItemGroup>Amount Gross: <ItemValue>{item.AmountGross.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                        {!!item.PensionFond &&<ItemGroup>Pension Fond: <ItemValue>{item.PensionFond.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                        {!!item.PensionSavings &&<ItemGroup>Pension Savings: <ItemValue>{item.PensionSavings.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                        <hr/>
                                        {!!item.Tax.Total &&<ItemGroup>Total Tax: <ItemValue>{item.Tax.Total.toFixed(2)} kr.</ItemValue></ItemGroup>}
                                        {!!item.Tax.RateSelected &&<ItemGroup>Tax Rate: <ItemValue>{item.Tax.RateSelected} %</ItemValue></ItemGroup>}
                                        {!!item.Tax.Discount && <ItemGroup>Tax Discount: <ItemValue>{item.Tax.Discount} kr.</ItemValue></ItemGroup>}
                                    </>}
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
