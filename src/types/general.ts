import React from "react";

export type EventClickType = React.ChangeEvent<HTMLInputElement>

export interface GetSSNResponse {
    SSN: string | number,
    Name: string,
    Address: string,
    HasIncomes: boolean,
    MonthIncome: number,
    OtherMonthIncome: number,
    PensionSavings: number,
    PersonalDiscount: number,
    ChildEstimateBirthDate: string
}

export interface BackEndResponse {
    StartDate: string,
    EndDate: string,
    AmountNet: number,
    AmountGross: number,
    PensionFond: number,
    PensionSavings: number,
    Tax: BackEndTaxProp
}

export interface BackEndTaxProp {
    Total: number,
    RateSelected: number,
    Discount: number
}

export interface PeriodsProps {
    LeavePercentage: number,
    StartDate: Date,
    EndDate: Date | null,
}

export interface BackEndRequest {
    SSN: string | number,
    WorkingType: string | null,
    PensionSavings: number,
    PersonalDiscount: number,
    Periods: PeriodsProps[]
}