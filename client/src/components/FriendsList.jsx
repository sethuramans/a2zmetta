import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends, setPage } from '../store/friendsSlice';
import Pagination from './Pagination';

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends, loading, error, page, total, limit } = useSelector((state) => state.friends);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchFriends({ page, limit }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const colors = [
    'border-primary',
    'border-secondary',
    'border-success',
    'border-danger',
    'border-warning',
    'border-info',
    'border-dark'
  ];

  return (
    <div className="highlight-section">
      <div className="highlight-inner-wrap">
        <div className="rewards-earned">
          <div className="icon">
            <span className="bi bi-people"></span>
          </div>
          <div className="info">
            {loading && <p>Loading friends...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
              <div>
                <span>Total Friends:</span> <h4>{total || "0"}</h4>
              </div>
            )}
          </div>
        </div>

        <hr />
        {!loading && !error && (
          
            <div className='friends-list p-3'>
              {friends.map((friend) => {
                 const randomColor = colors[Math.floor(Math.random() * colors.length)];
                return (
                <div className={`card my-1 `} key={friend.id}>
                  
                  <div className="card-body text-center">
                  <h5 class="card-title">{friend?.displayname ||friend.username}</h5>
                  
                  </div>
                </div>
              )})}
              <div className='my-2'>
              <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            </div>
            </div>
            
        )}
      </div>
    </div>
  );
};

export default FriendsList;
