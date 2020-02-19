import gql from "graphql-tag";

declare interface ReqProps {
    SSN: number,
    WorkingType: string,
    PensionSavings: number,
    PersonalDiscount: number,
    Periods: any[]
}

export const getSSNQuery = (SSN: string) => gql`
        query {
          infoBySSN(SSN : "${SSN}") {
            SSN,
            Name,
            Address,
            HasIncomes,
            MonthIncome,
            OtherMonthIncome,
            PensionSavings,
            PersonalDiscount,
            ChildEstimateBirthDate
          }
        }
`;

export const getResult = ({
      SSN,
      WorkingType,
      PensionSavings,
      PersonalDiscount,
      Periods
  }: ReqProps) => gql`
    query {
      calculateFinalAmount(calcRequest :{
        SSN : "${SSN}",
        WorkingType: "${WorkingType}",
        PensionSavings: ${PensionSavings},
        PersonalDiscount: ${PersonalDiscount},
        Periods: ${JSON.stringify(Periods).replace(/\"([^(\")"]+)\":/g, "$1:")}
      }) {
        SSN,
        Periods {
          StartDate,
          EndDate,
          AmountNet,
          AmountGross,
          PensionFond,
          PensionSavings,
          Tax {
            Total,
            RateSelected,
            Discount
          }
        }
      }
}
`;
