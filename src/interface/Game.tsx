import React, { useState, useEffect, KeyboardEvent as ReactKeyboardEvent } from "react";
import { ImPacman } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import { GiBrickWall } from "react-icons/gi";
import { PacmanPosition } from "../entities/pacmanposition";
import { Direction } from "../entities/dirrection";
import { checkWinningCondition } from "../usecases/winningCondition";
import { handleKeyDown } from "../usecases/keyboardlogics";

const PacManGame: React.FC = () => {
    const [pacman, setPacman] = useState<PacmanPosition>({ x: 6, y: 4 });
    const [direction, setDirection] = useState<Direction>("right");
    const [map, setMap] = useState<number[][]>([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
        [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 4, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setPacman({ x: 6, y: 4 });
        setDirection("right");
        setMap([
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
            [1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 1],
            [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
            [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 1, 4, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]);
        setScore(0);
    };

    useEffect(() => {
        const handleKeyDownEvent = (event: KeyboardEvent) =>
            handleKeyDown(event, pacman, direction, map, gameOver, setPacman, setDirection, setMap, setGameOver, setScore);

        if (gameStarted) {
            document.addEventListener("keydown", handleKeyDownEvent);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    }, [pacman, direction, map, gameOver, score, gameStarted]);

    return (
        <>
        <div className="bg-black">
            <div className="text-white text-center mb-4">Score: {score}</div>
            {map.map((row, rowIndex) => (
                <div key={rowIndex} className="flex bg-black">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`w-8 h-8 flex items-center justify-center bg-black ${
                                cell === 1
                                    ? "bg-purple-900"
                                    : cell === 2
                                    ? "bg-black"
                                    : cell === 3
                                    ? "bg-black"
                                    : cell === 5
                                    ? "bg-black"
                                    : ""
                            }`}
                        >
                            {cell === 1 ? (
                                <GiBrickWall size="1.5em" color="purple" />
                            ) : cell === 2 ? (
                                <GoDotFill size="1em" color="white" />
                            ) : cell === 5 ? (
                                <ImPacman
                                    size="1.5em"
                                    color="yellow"
                                    style={{
                                        transform: `rotate(${
                                            direction === "left"
                                                ? 0
                                                : direction === "up"
                                                ? -90
                                                : direction === "down"
                                                ? 90
                                                : 0
                                        }deg) scaleX(${direction === "left" ? -1 : 1})`
                                    }}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        
                
        </div>
        <div className="text-center text-white">
                    <button
                        className="bg-purple-900 border-black text-white px-4 py-2 rounded mt-4"
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                </div>
            
        </>
    );
};

export default PacManGame;
