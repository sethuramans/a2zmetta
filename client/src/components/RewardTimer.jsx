import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveRewards } from "../services/api";
import {
  incrementPoints,
  setTimerStart,
  resetRewards,
} from "../store/rewardsSlice";
import { fetchTotalRewards } from '../store/rewardsSlice';

const REWARD_INTERVAL = 10 * 1000;
//const CLOSING_HOURS = 8 * 60 * 60 * 1000;
const CLOSING_HOURS = 20 * 1000;

function RewardTimer({ userId }) {
  const dispatch = useDispatch();
  const { points } = useSelector((state) => state.rewards);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CLOSING_HOURS);

  // Restore timer on mount
  useEffect(() => {
    const savedStart = localStorage.getItem("rewardTimerStart");

    if (savedStart) {
      const start = Number(savedStart);
      dispatch(setTimerStart(start));
      setIsRunning(true);
    }
  }, [dispatch]);

  const pointsRef = useRef(points);
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);
  // Main reward logic
  const [lastTick, setLastTick] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const start = Number(localStorage.getItem("rewardTimerStart"));
      const elapsed = now - start;
      const ticksPassed = Math.floor(elapsed / REWARD_INTERVAL);

      // Only add if time has passed
      const newPoints = ticksPassed - lastTick;
      if (newPoints > 0) {
        for (let i = 0; i < newPoints; i++) {
          dispatch(incrementPoints());
        }
        setLastTick(ticksPassed);
      }

      setTimeLeft(Math.max(CLOSING_HOURS - elapsed, 0));

      if (elapsed >= CLOSING_HOURS && points && userId) {
        saveRewards({ points: points, userId: userId, reason: "mining" }).then(
          () => {
            localStorage.removeItem("rewardTimerStart");
            dispatch(resetRewards());
            dispatch(fetchTotalRewards()); 
            setIsRunning(false);
            setTimeLeft(CLOSING_HOURS);
            setLastTick(0);
          }
        );
      }
    }, 1000); // check every second for accuracy

    return () => clearInterval(interval);
  }, [isRunning, points, dispatch, lastTick, userId]);

  const handleStart = () => {
    const now = Date.now();
    localStorage.setItem("rewardTimerStart", now);
    dispatch(setTimerStart(now));
    setTimeLeft(CLOSING_HOURS);
    setIsRunning(true);
  };

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const progressPercent = 100 - (timeLeft / CLOSING_HOURS) * 100;

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", textAlign: "center" }}>
      <h4>Earn rewards: {points}</h4>

      <div style={{ margin: "10px 0" }}>
        <progress value={progressPercent} max="100" style={{ width: "100%" }} />
        <p>Time left: {formatTime(timeLeft)}</p>
      </div>

      {!isRunning && <button className='btn btn-secondary' onClick={handleStart}>Start Mining</button>}
    </div>
  );
}

export default RewardTimer;
