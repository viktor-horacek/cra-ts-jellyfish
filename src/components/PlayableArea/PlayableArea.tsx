import React, { FC, MouseEvent, useEffect } from 'react';
import { styled } from '@linaria/react';
import { PlayerBlock } from '../PlayerBlock/PlayerBlock';
import { v4 } from 'uuid';
import uniqolor from 'uniqolor';
import { PlayableAreaControl } from '../PlayerableAreaControl/PlayableAreaControl';

const PlayableAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 510px;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 50px;
`;

const PlayerBlockContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 20px;
    max-width: 510px;
    justify-content: center;
    width: 100%;
`;

export type PlayerType = {
    id: string;
    score: number;
    color: string;
};

export type RemovePlayerType = (
    id: string
) => (e: MouseEvent<HTMLDivElement>) => void;
export type ChangePlayerScoreType = (id: string) => (score: number) => void;
export type ChangePlayerColorType = (id: string) => (color: string) => void;
export type AddPlayerType = () => void;
export type ResetPlayersScoreType = () => void;

export const PlayableArea: FC = () => {
    const [players, setPlayers] = React.useState<Array<PlayerType>>([]);

    useEffect(() => {
        const newPlayers: Array<PlayerType> = [];
        for (let i = 0; i < 4; i++) {
            newPlayers.push(getPlayer());
        }
        setPlayers(newPlayers);
    }, []);

    const getPlayer = () => ({
        id: v4(),
        score: 0,
        color: uniqolor.random().color,
    });

    const addPlayer: AddPlayerType = () => {
        setPlayers([...players, getPlayer()]);
    };

    const removePlayer: RemovePlayerType = (id: string) => (event) => {
        event.stopPropagation();
        setPlayers(players.filter((player) => player.id !== id));
    };

    const resetPlayersScore: ResetPlayersScoreType = () => {
        setPlayers(
            players.map((player) => {
                return {
                    ...player,
                    score: 0,
                };
            })
        );
    };

    const changePlayerColor: ChangePlayerColorType =
        (id: string) => (color: string) => {
            setPlayers(
                players.map((player) => {
                    if (player.id === id) {
                        return {
                            ...player,
                            color,
                        };
                    }
                    return player;
                })
            );
        };

    const changePlayerScore: ChangePlayerScoreType =
        (id: string) => (score: number) => {
            setPlayers(
                players.map((player) => {
                    if (player.id === id) {
                        return {
                            ...player,
                            score,
                        };
                    }
                    return player;
                })
            );
        };

    return (
        <PlayableAreaContainer>
            <PlayableAreaControl
                addPlayer={addPlayer}
                resetPlayersScore={resetPlayersScore}
            />
            <PlayerBlockContainer>
                {players.map(({ id, score, color }) => (
                    <PlayerBlock
                        key={id}
                        color={color}
                        score={score}
                        removePlayer={removePlayer(id)}
                        changePlayerScore={changePlayerScore(id)}
                        changePlayerColor={changePlayerColor(id)}
                    />
                ))}
                <div style={{ width: '150px', height: '150px' }} />
                <div style={{ width: '150px', height: '150px' }} />
            </PlayerBlockContainer>
        </PlayableAreaContainer>
    );
};
