import styled from "styled-components";

export const WizardFormWrap = styled.div`
    h1 {
        font-size: 50px;
    }
`;

export const ItemGroup = styled.p`
    font-size: 20px;
    font-weight: bold;
`;

export const ItemValue = styled.span`
    color: rgb(12, 149, 176);
    font-weight: normal;
`;

export const overrideMaterialToOrange = `
    .MuiGrid-container {
        width: auto !important;
    }
    .MuiInput-underline:before {
        border-bottom: 1px solid darkorange !important;
    }
    .MuiInput-underline:after {
        border-bottom: 2px solid darkorange !important;
    }
    .Mui-focused {
        color: darkorange !important;
    }
`