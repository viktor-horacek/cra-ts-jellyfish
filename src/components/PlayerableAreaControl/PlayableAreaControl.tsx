import React, { FC } from 'react';
import {
    AddPlayerType,
    ResetPlayersScoreType,
} from '../PlayableArea/PlayableArea';
import { styled } from '@linaria/react';

type PlayableAreaControlProps = {
    resetPlayersScore: ResetPlayersScoreType;
    addPlayer: AddPlayerType;
};

const Button = styled.button`
    align-items: center;
    appearance: none;
    background-color: #fcfcfd;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
        rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395a;
    cursor: pointer;
    display: inline-flex;
    font-family: 'JetBrains Mono', monospace;
    height: 26px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow 0.15s, transform 0.15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 18px;

    &:focus {
        box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
            rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    }

    &:hover {
        box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
            rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
        transform: translateY(-2px);
    }

    &:active {
        box-shadow: #d6d6e7 0 3px 7px inset;
        transform: translateY(2px);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export const PlayableAreaControl: FC<PlayableAreaControlProps> = ({
    addPlayer,
    resetPlayersScore,
}) => {
    return (
        <ButtonContainer>
            <Button onClick={addPlayer}>Přidat hráče</Button>
            <Button onClick={resetPlayersScore}>Resetovat</Button>
        </ButtonContainer>
    );
};
