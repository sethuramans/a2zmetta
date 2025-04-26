import React, { useState, useEffect } from "react";
import { saveRewards } from "../services/api";

const Timer = ({ userId }) => {
  const storedTime = parseInt(localStorage.getItem("timer") || "0", 10);
  const storedPoints = parseInt(localStorage.getItem("points") || "0", 10);
  const storedStartTime = parseInt(
    localStorage.getItem("startTime") || "0",
    10
  );

  const [time, setTime] = useState(storedTime);
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState(storedPoints);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setPoints(0);
    localStorage.setItem("timer", "0");
    localStorage.setItem("points", "0");
    setIsRunning(false);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);

        // ✅ Increase reward points every 10 seconds
        if ((time + 1) % 10 === 0) {
          setPoints((prevPoints) => prevPoints + 5); // Add 5 points every 10 sec
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // ✅ Save timer and points to localStorage to persist after refresh
  useEffect(() => {
    localStorage.setItem("timer", time.toString());
    localStorage.setItem("points", points.toString());
  }, [time, points]);

  // ✅ Store in DB after 8 hours
  useEffect(() => {
    const saveToDB = async () => {
      //const time =  8 * 60 * 60 * 1000;
      if (isRunning && Date.now() - storedStartTime >= 60 * 1000) {
        try {
          await saveRewards({
            userId,
            points,
            reason: "mining",
          });
          localStorage.setItem("startTime", Date.now().toString());
          reset();
          console.log("✅ Points saved to DB");
        } catch (error) {
          console.error("❌ Error saving points:", error);
        }
      }
    };

    saveToDB();
  }, [points, userId, storedStartTime, isRunning]);

  return (
    <div style={styles.container}>
      <h2>Timer: {time} sec</h2>
      <h3>Reward Points: {points}</h3>
      <button className="btn btn-secondary"onClick={handleStartStop} style={styles.button}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={reset} style={styles.button}>
        Reset
      </button>
    </div>
  );
};

// ✅ Styling
const styles = {
  container: { textAlign: "center", padding: "20px" },
  button: { margin: "10px", padding: "10px", fontSize: "16px" },
};

export default Timer;
