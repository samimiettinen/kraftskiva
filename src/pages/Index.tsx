import { useGameState } from "@/hooks/useGameState";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import SetupScreen from "@/components/game/SetupScreen";
import HelanGarScreen from "@/components/game/HelanGarScreen";
import SingingScreen from "@/components/game/SingingScreen";
import RatingScreen from "@/components/game/RatingScreen";
import DrinkScreen from "@/components/game/DrinkScreen";
import ScoreboardScreen from "@/components/game/ScoreboardScreen";
import GameOverScreen from "@/components/game/GameOverScreen";

const Index = () => {
  const {
    state,
    startGame,
    finishHelan,
    submitRating,
    nextTurn,
    showScoreboard,
    goToRating,
    goToSetup,
    restartGame,
  } = useGameState();

  switch (state.phase) {
    case "welcome":
      return <WelcomeScreen onStart={goToSetup} />;

    case "setup":
      return <SetupScreen onStart={startGame} />;

    case "helan":
      return state.currentSong ? (
        <HelanGarScreen song={state.currentSong} onFinish={finishHelan} />
      ) : null;

    case "singing":
      return state.currentSong ? (
        <SingingScreen
          song={state.currentSong}
          currentTeam={state.currentTeam}
          playerName={
            state.currentTeam === "swedish"
              ? state.swedishPlayerName
              : state.finnishPlayerName
          }
          songsPlayed={state.songsPlayed}
          totalRounds={state.totalRounds}
          onFinishSinging={goToRating}
        />
      ) : null;

    case "rating":
      return (
        <RatingScreen
          currentTeam={state.currentTeam}
          performerName={
            state.currentTeam === "swedish"
              ? state.swedishPlayerName
              : state.finnishPlayerName
          }
          raterName={
            state.currentTeam === "swedish"
              ? state.finnishPlayerName
              : state.swedishPlayerName
          }
          onRate={submitRating}
        />
      );

    case "drink":
      return (
        <DrinkScreen
          currentTeam={state.currentTeam}
          playerName={
            state.currentTeam === "swedish"
              ? state.swedishPlayerName
              : state.finnishPlayerName
          }
          onNext={nextTurn}
        />
      );

    case "scoreboard":
      return (
        <ScoreboardScreen
          swedishName={state.swedishPlayerName}
          finnishName={state.finnishPlayerName}
          swedishScore={state.swedishScore}
          finnishScore={state.finnishScore}
          onContinue={nextTurn}
        />
      );

    case "gameover":
      return (
        <GameOverScreen
          swedishName={state.swedishPlayerName}
          finnishName={state.finnishPlayerName}
          swedishScore={state.swedishScore}
          finnishScore={state.finnishScore}
          onRestart={restartGame}
        />
      );

    default:
      return <WelcomeScreen onStart={goToSetup} />;
  }
};

export default Index;
