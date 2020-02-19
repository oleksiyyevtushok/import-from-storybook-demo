import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import React from 'react';
import styled from "styled-components";
import PageError from "./components/PageError";
import PageFive from "./components/PageFive";
import PageOne from "./components/PageOne";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "apollo-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import PageResults from "./components/PageResults";
import PageSix from "./components/PageSix";
import PageTwo from "./components/PageTwo";
import PageThree from "./components/PageThree";
import PageFour from "./components/PageFour";
import Navigation from "./components/Navigation";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});

const RootContainer = styled(Container)`
 margin-top: 40px;
`;

const NavCol = styled(Col)`
  @media (max-width: 950px) {
    display: none;
  }
`

const Root = () => {
    const [page, setPage] = React.useState<number>(1);
    const [isError, setError] = React.useState<boolean>(false);
    // input values //
    const [calculations, setCalculations]= React.useState(0);
    const [months, setMonths]= React.useState(1);
    //
    const [queryResults, setQueryResults] = React.useState<any>({});
    const [requestToBack, setRequestToBack] = React.useState({
        SSN: null,
        WorkingType: null,
        PensionSavings: null,
        PersonalDiscount: null,
        Periods: null
    });

    const nextPage = () => {
        setPage(page + 1);
    };
    const prevPage = () => {
        setPage(page - 1);
    };
    const homePage = () => {
        setPage(1);
        setError(false);
    }
    if(isError){
        return <PageError homePage={homePage}/>
    }
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <RootContainer fluid>
                    <Row className={'justify-content-center'}>
                        <Col md={8} sm={12}>
                            {page === 1 &&
                            <PageOne
                                nextPage={nextPage}
                            />}
                            {page === 2 &&
                            <PageTwo
                                setCalculations={(val: number) => setCalculations(val)}
                                nextPage={nextPage}
                                prevPage={prevPage}
                            />}
                            {page === 3 &&
                            <PageThree
                                calculations={calculations}
                                setError={(val: boolean) => setError(val)}
                                nextPage={nextPage}
                                prevPage={prevPage}
                                requestToBack={requestToBack}
                                setRequestToBack={setRequestToBack}
                                setQueryResults={(res: any) => setQueryResults(res)}
                            />}
                            {page === 4 &&
                            <PageFour
                                setError={(val: boolean) => setError(val)}
                                nextPage={nextPage}
                                prevPage={prevPage}
                                requestToBack={requestToBack}
                                setRequestToBack={setRequestToBack}
                                queryResults={queryResults}
                            />}
                            {page === 5 &&
                            <PageFive
                                nextPage={nextPage}
                                prevPage={prevPage}
                                setMon={(val: number) => setMonths(val)}
                            />}
                            {page === 6 &&
                            <PageSix
                                nextPage={nextPage}
                                prevPage={prevPage}
                                months={months}
                                requestToBack={requestToBack}
                                setRequestToBack={setRequestToBack}
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
}

export default Root;
