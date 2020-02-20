import { useQuery } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from 'react';
import WizardForm from '@itera-storybook/wizard-form/lib/WizzardForm/src/WizardForm';
import styled from 'styled-components';
import { ItemValue, WizardFormWrap, ItemGroup } from "../../constants/globalStyledComponents";
import { getResult } from "../../helpers/query";
import { removeDigits, removeTimeFromDate } from "../../helpers/value";
import { BackEndResponse } from "../../types/general";

const ShortInfo = styled(ItemValue)`
    font-weight: 500,
`;

const PeriodHeader = styled.p`
    font-size: 20px;
    color: darkorange;
    font-weight: bold;
    margin-right: 10px;
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
      @media (max-width: 950px) {
        flex-direction: column;
    }
  }
`;

const AddInfoGroup = styled.span`
      @media (max-width: 950px) {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }
  }
`

const PageResults = ({homePage, requestToBack}: any) => {
    const {
        data,
    } = useQuery(getResult(requestToBack));
    const [isExpanded, setExpanded] = React.useState([false, false]);
    if (data) {
        const {Periods} = data.calculateFinalAmount;
        const setExpandedState = (index: any, isExpanded: any) => {
            if (index === 0) {
                setExpanded([!isExpanded[index], isExpanded[index + 1]]);
            } else {
                setExpanded([isExpanded[index -1], !isExpanded[index]]);
            }
        };
        return (
            <WizardFormWrap>
                <WizardForm
                    header={'Summary'}
                    nextButtonClick={homePage}
                    nextButtonText={'Home'}
                    child={
                        <div>
                            {Periods.map((item: BackEndResponse, index: number) => (
                                <React.Fragment key={index + item.StartDate}>
                                    <GroupOfLabel>
                                        <PeriodHeader>Period {index + 1}:</PeriodHeader>
                                        {!isExpanded[index] &&
                                        <AddInfoGroup>
                                            <ShortInfo>
                                                {removeTimeFromDate(item.StartDate)} to {removeTimeFromDate(item.EndDate)}
                                            </ShortInfo>
                                            <ShortInfo>
                                                | {removeDigits(item.AmountNet)} kr.
                                            </ShortInfo>
                                        </AddInfoGroup>}
                                    </GroupOfLabel>
                                    <ButtonStyled
                                        style={{marginBottom: '20px'}}
                                        variant="contained"
                                        onClick={() => setExpandedState(index, isExpanded)}
                                    >
                                        {isExpanded[index] ? 'Hide' : 'Expand'}
                                    </ButtonStyled>
                                    {isExpanded[index] && <>
                                        <hr/>
                                        {!!item.StartDate &&
                                        <ItemGroup>
                                            Start of period:
                                            <ItemValue>{removeTimeFromDate(item.StartDate)}</ItemValue>
                                        </ItemGroup>}
                                        {!!item.EndDate &&
                                        <ItemGroup>
                                            End of period:
                                            <ItemValue>{removeTimeFromDate(item.EndDate)}</ItemValue>
                                        </ItemGroup>}
                                        {!!item.AmountNet &&
                                        <ItemGroup>
                                            Amount Net:
                                            <ItemValue>{removeDigits(item.AmountNet)} kr.</ItemValue>
                                        </ItemGroup>}
                                        {!!item.AmountGross &&
                                        <ItemGroup>
                                            Amount Gross:
                                            <ItemValue>{removeDigits(item.AmountGross)} kr.</ItemValue>
                                        </ItemGroup>}
                                        {!!item.PensionFond &&
                                        <ItemGroup>
                                            Pension Fond:
                                            <ItemValue>{removeDigits(item.PensionFond)} kr.</ItemValue>
                                        </ItemGroup>}
                                        {!!item.PensionSavings &&
                                        <ItemGroup>
                                            Pension Savings:
                                            <ItemValue>{removeDigits(item.PensionSavings)} kr.</ItemValue>
                                        </ItemGroup>}
                                        <hr/>
                                        {!!item.Tax.Total &&
                                        <ItemGroup>Total Tax:
                                            <ItemValue>{removeDigits(item.Tax.Total)} kr.</ItemValue>
                                        </ItemGroup>}
                                        {!!item.Tax.RateSelected &&
                                        <ItemGroup>Tax Rate:
                                            <ItemValue>{item.Tax.RateSelected} %</ItemValue>
                                        </ItemGroup>}
                                        {!!item.Tax.Discount &&
                                        <ItemGroup>Tax Discount:
                                            <ItemValue>{item.Tax.Discount} kr.</ItemValue>
                                        </ItemGroup>}
                                    </>}
                                </React.Fragment>
                            ))}
                        </div>
                    }/>
            </WizardFormWrap>
        );
    } else {
        return <div/>
    }
};

export default PageResults;
