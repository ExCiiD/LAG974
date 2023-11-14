import createBtn from '../images/createBtn.png';

export const GameBar = ({ games, onSelectGame, onAddGame }) => {
    return (
        <div className='gameBar'>
            {games.map(game => (
                <img
                    key={game._id}
                    src={game.iconeJeu}
                    alt={game.nomJeu}
                    onClick={() => onSelectGame(game._id)}
                />
            ))}
            <button onClick={onAddGame}><img src={createBtn} alt='create Button' /></button>
        </div>
    );
};