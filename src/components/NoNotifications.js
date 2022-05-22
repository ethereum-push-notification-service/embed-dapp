import React from 'react'
import styled from 'styled-components';

const H2 = styled.h2`
    display: inline;
    color: rgb(255, 255, 255);
    background: rgb(53, 197, 243);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 12px;
    font-size: 1.2rem;
`;

const Span = styled.span`
  color: ${props => props.color || '#000'};
  background: ${props => props.bg || 'transparent'};
  font-weight: ${props => props.weight || 300};
  font-size: ${props => props.size || "inherit"};
  text-transform: ${props => props.textTransform || "inherit"};
  margin: ${props => props.margin || "0px"};
  padding: ${props => props.padding || "0px"};
  letter-spacing: ${props => props.spacing || "inherit"};
  text-align: ${props => props.textAlign || "initial"};
  position: ${props => props.pos || 'initial'};
  right: ${props => props.right || 'auto'};
  left: ${props => props.left || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  top: ${props => props.top || 'auto'};
  z-index: ${props => props.z || 'auto'};
`

const A = styled.a`
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Content = styled.p`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FancyLink = () => {
    return (
      <A target="_blank" href='https://app.epns.io/#/live_walkthrough' rel="noreferrer">
        <H2>
          <Span bg="#35c5f3" color="#fff" weight="600">
            Live Walkthrough
          </Span>
        </H2>
      </A>
    );
};

const NoNotifications = () => {
    return (
        <Container>
            <div>You have no notifications!</div>
            <p>Please checkout our in-depth tutorial on how to opt-in for notifications.</p>  
            <FancyLink />
        </Container>
    );
};

export default NoNotifications;