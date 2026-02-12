import { useGameState } from "@/hooks/useGameState";
import { useAudioState } from "@/hooks/useAudioState";
import { setAudioMuted } from "@/lib/sounds";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import SetupScreen from "@/components/game/SetupScreen";
import HelanGarScreen from "@/components/game/HelanGarScreen";
import SingingScreen from "@/components/game/SingingScreen";
import RatingScreen from "@/components/game/RatingScreen";
import DrinkScreen from "@/components/game/DrinkScreen";
import ScoreboardScreen from "@/components/game/ScoreboardScreen";
import GameOverScreen from "@/components/game/GameOverScreen";
import { Volume2, VolumeX } from "lucide-react";

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

  const { isMuted, toggleMute } = useAudioState();

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setAudioMuted(newMuted);
    toggleMute();
  };

  switch (state.phase) {
    case "welcome":
      return (
        <div className="relative">
          <WelcomeScreen onStart={goToSetup} />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );

    case "setup":
      return (
        <div className="relative">
          <SetupScreen onStart={startGame} />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );

    case "helan-swedish":
    case "helan-finnish":
      return state.currentSong ? (
        <div className="relative">
          <HelanGarScreen song={state.currentSong} onFinish={finishHelan} />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      ) : null;

    case "singing":
      return state.currentSong ? (
        <div className="relative">
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
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      ) : null;

    case "rating":
      return (
        <div className="relative">
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
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );

    case "drink":
      return (
        <div className="relative">
          <DrinkScreen
            currentTeam={state.currentTeam}
            playerName={
              state.currentTeam === "swedish"
                ? state.swedishPlayerName
                : state.finnishPlayerName
            }
            onNext={nextTurn}
          />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );

    case "scoreboard":
      return (
        <div className="relative">
          <ScoreboardScreen
            swedishName={state.swedishPlayerName}
            finnishName={state.finnishPlayerName}
            swedishScore={state.swedishScore}
            finnishScore={state.finnishScore}
            onContinue={nextTurn}
          />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );

    case "gameover":
      return (
        <div className="relative">
          <GameOverScreen
            swedishName={state.swedishPlayerName}
            finnishName={state.finnishPlayerName}
            swedishScore={state.swedishScore}
            finnishScore={state.finnishScore}
            onRestart={restartGame}
          />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );

    default:
      return (
        <div className="relative">
          <WelcomeScreen onStart={goToSetup} />
          <button
            onClick={handleMuteToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      );
  }
};

export default Index;
