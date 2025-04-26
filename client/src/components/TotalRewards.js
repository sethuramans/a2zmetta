import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRewards } from "../store/rewardsSlice";

const TotalRewards = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const totalRewards = useSelector((state) => state.rewards.totalRewards);
  useEffect(() => {
    if (user) {
      dispatch(fetchTotalRewards());
    }
  }, [dispatch, user]);

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <span>Rewards:</span> <h4>{totalRewards}</h4>
    </div>
  );
};

export default TotalRewards;
