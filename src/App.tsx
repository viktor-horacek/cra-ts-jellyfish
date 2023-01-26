import React from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { PlayableArea } from './components/PlayableArea/PlayableArea';

export const globals = css`
    :global(*) {
        html {
            box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }

        body {
            margin: 0;
            background: #054;
        }
    }
`;

const Body = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const Title = styled.h1`
    font-family: 'JetBrains Mono', monospace;
    font-size: 40px;
`;

const TitleContainer = styled.div`
    height: 100px;
    color: #fff;
    margin-bottom: 20px;
`;

function App() {
    return (
        <Body className={globals}>
            <TitleContainer>
                <Title>JEVILFISH</Title>
            </TitleContainer>
            <PlayableArea />
        </Body>
    );
}

export default App;
