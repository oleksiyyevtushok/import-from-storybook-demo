import React from 'react';
import styled from 'styled-components';
import { navItems as Navitems } from '../../constants/defaultValues';

const StatusWrap = styled.span<{ pageStatus: string, last?: boolean }>`
    position:relative;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 50%;
    ${({pageStatus}) => pageStatus === 'current' ? `
        background: rgb(12, 149, 176);
        color: white;
    ` : pageStatus === 'next' ? `
        padding: 8px 18px;
        background: white;
        color: rgb(12, 149, 176);
        border: 2px solid rgb(12, 149, 176);
        font-weight: bold;
    ` : `
        background: rgb(12, 149, 176);
        color: white;
        opacity: 0.6;
    `}
    &:after {
        content:"";
        position: absolute;
        top: 50%;
        left: calc(50% - 2px);
        height: 70px;
        border-left: 5px solid rgb(12, 149, 176);
        z-index: -1;
    }
    ${({last}) => last && `
        &:after {
            opacity: 0;
        }
    `}
`;

const LabelWrap = styled.span<{ pageStatus: string }>`
    color: rgb(12,149,176);
    padding-left: 20px;
    font-size: 23px;
    ${({pageStatus}) => pageStatus === 'current' ? `
            color: rgb(12,149,176);
    ` : pageStatus === 'next' ? `
            color: gray;
            opacity: 0.6;
    ` : `
        opacity: 0.6;
    `}
`;

const ListWrap = styled.ul`
    list-style: none;
    li {
        margin-bottom: 60px;
    }
`;

const getPageStatus = (val: number, page: number) => {
    return val === page ? 'current'
        : val > page ? 'next'
            : 'prev';
}

const Navigation = ({page}: any) => {
    return (
        <>
            <ListWrap>
                {Navitems.map((navItem: any) => (
                    <li key={navItem.value}>
                        <StatusWrap
                            last={navItem.value === Navitems.length}
                            pageStatus={getPageStatus(navItem.value, page)}>
                            {navItem.value}
                        </StatusWrap>
                        <LabelWrap pageStatus={getPageStatus(navItem.value, page)}>{navItem.label}</LabelWrap>
                    </li>
                ))}
            </ListWrap>
        </>
    );
}

export default Navigation;
