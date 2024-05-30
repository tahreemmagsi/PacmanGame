import { PacmanPosition } from "../entities/pacmanposition";
import { Direction } from "../entities/dirrection";
import { checkWinningCondition } from "./winningCondition";

// Use the standard DOM KeyboardEvent
export const handleKeyDown = (
    event: KeyboardEvent,
    pacman: PacmanPosition,
    direction: Direction,
    map: number[][],
    gameOver: boolean,
    setPacman: React.Dispatch<React.SetStateAction<PacmanPosition>>,
    setDirection: React.Dispatch<React.SetStateAction<Direction>>,
    setMap: React.Dispatch<React.SetStateAction<number[][]>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    setScore: React.Dispatch<React.SetStateAction<number>>
) => {
    if (gameOver) {
        return;
    }
    let newX = pacman.x;
    let newY = pacman.y;
    let newDirection: Direction = direction;

    if (event.key === "ArrowLeft" && pacman.x > 0 && map[pacman.y][pacman.x - 1] !== 1) {
        newX -= 1;
        newDirection = "left";
    } else if (event.key === "ArrowUp" && pacman.y > 0 && map[pacman.y - 1][pacman.x] !== 1) {
        newY -= 1;
        newDirection = "up";
    } else if (event.key === "ArrowRight" && pacman.x < map[0].length - 1 && map[pacman.y][pacman.x + 1] !== 1) {
        newX += 1;
        newDirection = "right";
    } else if (event.key === "ArrowDown" && pacman.y < map.length - 1 && map[pacman.y + 1][pacman.x] !== 1) {
        newY += 1;
        newDirection = "down";
    }

    if (newX !== pacman.x || newY !== pacman.y) {
        setMap((prevMap) => {
            const newMap = prevMap.map(row => [...row]);
            if (newMap[newY][newX] === 2) {
                setScore(prevScore => prevScore + 1); 
            }
            newMap[pacman.y][pacman.x] = 3;
            newMap[newY][newX] = 5;
            return newMap;
        });
        setPacman({ x: newX, y: newY });
        setDirection(newDirection);
    }

    checkWinningCondition(map, setGameOver);
};
