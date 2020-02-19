import gql from "graphql-tag";


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

