import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import './App.css';
import React from 'react';
import styled from "styled-components";
import PageError from "./components/pages/PageError";
import PaymentPeriod from "./components/pages/PaymentPeriod";
import Welcome from "./components/pages/Welcome";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "apollo-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import PageResults from "./components/pages/PageResults";
import MaternityPlan from "./components/pages/MaternityPlan";
import EnterSSN from "./components/pages/EnterSSN";
import UserInfo from "./components/pages/UserInfo";
import AdditionalInfo from "./components/pages/AdditionalInfo";
import Navigation from "./components/blocks/Navigation";
import { GetSSNResponse } from "./types/general";


// Apollo server client settings.
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});

// Styled components
const RootContainer = styled(Container)`
  margin-top: 40px;
`;

const NavCol = styled(Col)`
  @media (max-width: 950px) {
    display: none;
  }
`;

const App = () => {
    const [page, setPage] = React.useState<number>(1);
    const [isError, setError] = React.useState<boolean>(false);

    // input values
    const [ssn, setSSNValue] = React.useState('');
    const [months, setMonths] = React.useState(1);

    // Store
    const [queryResults, setQueryResults] = React.useState<any>({});
    const [requestToBack, setRequestToBack] = React.useState<any>({
        SSN: null,
        WorkingType: null,
        PensionSavings: null,
        PersonalDiscount: null,
        Periods: null
    });

    // Page handlers
    const nextPage = () => {
        setPage(page + 1);
    };
    const prevPage = () => {
        setPage(page - 1);
    };
    const homePage = () => {
        setPage(1);
        setError(false);
    };

    // Error handler
    if (isError) {
        return <PageError homePage={homePage}/>
    };

    const pageHandlers = {
        nextPage: nextPage,
        prevPage: prevPage,
    };

    const requestStoreProps = {
        requestToBack: requestToBack,
        setRequestToBack: setRequestToBack
    };

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <RootContainer fluid>
                    <Row className={'justify-content-center'}>
                        <Col md={8} sm={12}>
                            {page === 1 &&
                            <Welcome
                                nextPage={nextPage}
                            />}
                            {page === 2 &&
                            <EnterSSN
                                {...pageHandlers}
                                setSSNValue={(val: string) => setSSNValue(val)}
                            />}
                            {page === 3 &&
                            <UserInfo
                                {...pageHandlers}
                                {...requestStoreProps}
                                ssn={ssn}
                                setQueryResults={(res: GetSSNResponse) => setQueryResults(res)}
                            />}
                            {page === 4 &&
                            <AdditionalInfo
                                {...pageHandlers}
                                {...requestStoreProps}
                                queryResults={queryResults}
                                setError={(val: boolean) => setError(val)}
                            />}
                            {page === 5 &&
                            <PaymentPeriod
                                {...pageHandlers}
                                setMon={(val: number) => setMonths(val)}
                            />}
                            {page === 6 &&
                            <MaternityPlan
                                {...pageHandlers}
                                {...requestStoreProps}
                                months={months}
                                birthDate={queryResults.ChildEstimateBirthDate}
                            />}
                            {page === 7 &&
                            <PageResults
                                requestToBack={requestToBack}
                                homePage={homePage}
                            />}
                        </Col>
                        <NavCol md={4} sm={0}><Navigation page={page}/></NavCol>
                    </Row>
                </RootContainer>
            </div>
        </ApolloProvider>
    );
};

export default App;
