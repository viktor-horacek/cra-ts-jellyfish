import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import {
    ChangePlayerColorType,
    ChangePlayerScoreType,
    PlayerType,
    RemovePlayerType,
} from '../PlayableArea/PlayableArea';
import { styled } from '@linaria/react';
import { IoMdClose, IoMdColorPalette, IoMdRemove } from 'react-icons/io';
import { HexColorPicker } from 'react-colorful';
import { useClickOutside } from '../../hooks/useClickOutside';

const PlayerBlockWrapper = styled.div`
    position: relative;
`;

const PlayerBlockContainer = styled.div<{ color: string }>`
    width: 150px;
    height: 150px;
    position: relative;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    transition: transform 0.15s;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(2px);
    }
`;

const CloseButton = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    line-height: 0;
    border-top-right-radius: 10px;
`;

const DecreaseScoreButton = styled.span`
    position: absolute;
    bottom: 0;
    left: 5px;
    cursor: pointer;
    line-height: 0;
    border-bottom-left-radius: 10px;
`;

const ColorPickerButton = styled.span`
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    line-height: 0;
    border-bottom-right-radius: 10px;
`;

const ColorPickerContainer = styled.div`
    position: relative;
`;

const ColorPickerPopover = styled.div`
    z-index: 100;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
`;

type PlayerBlockProps = {
    removePlayer: ReturnType<RemovePlayerType>;
    changePlayerScore: ReturnType<ChangePlayerScoreType>;
    changePlayerColor: ReturnType<ChangePlayerColorType>;
} & Omit<PlayerType, 'id'>;

export const PlayerBlock: FC<PlayerBlockProps> = ({
    score,
    color,
    removePlayer,
    changePlayerScore,
    changePlayerColor,
}) => {
    const [isColorPickerOpen, toggleColorPicker] = useState<boolean>(false);
    const [minusClicked, setMinusClicked] = useState<number>(0);
    const popover = useRef<HTMLDivElement>(null);
    useClickOutside(popover, () => toggleColorPicker(false));

    const addScore = () => {
        setMinusClicked(0);
        changePlayerScore(score + 1);
    };

    useEffect(() => {
        if (minusClicked > 10) {
            alert('O co se jako snažíš, mín jak nula tam prostě nebude :)');
            setMinusClicked(0);
        }
    }, [minusClicked]);

    const decreaseScore = (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        if (score > 0) {
            changePlayerScore(score - 1);
        } else {
            setMinusClicked(minusClicked + 1);
        }
    };

    const openColorPicker = async (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        toggleColorPicker(!isColorPickerOpen);
    };
    return (
        <PlayerBlockWrapper className={'neco'}>
            <PlayerBlockContainer onClick={addScore} color={color}>
                <CloseButton onClick={removePlayer}>
                    <IoMdClose size={24} />
                </CloseButton>
                <h1>{score}</h1>
                <DecreaseScoreButton onClick={decreaseScore}>
                    <IoMdRemove size={24} />
                </DecreaseScoreButton>
                <ColorPickerButton>
                    <ColorPickerContainer onClick={openColorPicker}>
                        <IoMdColorPalette size={24} />
                    </ColorPickerContainer>
                </ColorPickerButton>
            </PlayerBlockContainer>

            {isColorPickerOpen && (
                <ColorPickerPopover ref={popover}>
                    <HexColorPicker
                        color={color}
                        onChange={changePlayerColor}
                    />
                </ColorPickerPopover>
            )}
        </PlayerBlockWrapper>
    );
};
