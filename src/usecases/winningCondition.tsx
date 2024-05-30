
export const checkWinningCondition = (map: number[][], setGameOver: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!map.some((row) => row.includes(2))) {
        setGameOver(true);
        alert("Congratulations! You collected all the coins. You win!");
    } 
};
