// // HomePage.js
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './homepage.css';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   const redirectTo = (path) => {
//     navigate(path);
//   };
// const handleLogout = () => {
//       // Clear user session or authentication state
//       // For example, remove tokens from localStorage or cookies
//       localStorage.removeItem('authToken');
  
//       // Navigate the user back to the login page
//       navigate('/login');
//     };
  

//   return (
//     <div className="homepage-container">
//       {email && <h2>Welcome, {email}!</h2>}
//       <h3 className="heading">🐍Slither into action with Rattlerun!</h3>
//       <div className="button-container">
//         <button onClick={() => redirectTo('/main')}>Start Rattlerun</button>
//         <button onClick={() => redirectTo('/tic-tac-toe')}>More Games</button>
//         <br /><br />
//         {email ? (
//         <button onClick={handleLogout}>Logout</button>
//        ) : (
//          <button onClick={() => redirectTo('/login')}>Login</button>
//        )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;




// HomePage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email);

  const redirectTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear user session or authentication state
    // For example, remove tokens from localStorage or cookies
    localStorage.removeItem('authToken');
  
    // Reset email state to null
    setEmail(null);
  
    // Navigate the user back to the login page
    navigate('/');
  };

  return (
    <div className="homepage-container">
      {email && <h2>Welcome, {email}!</h2>}
      <h3 className="heading">🐍Slither into action with Rattlerun!</h3>
      <div className="button-container">
        <button onClick={() => redirectTo('/main')}>Start Rattlerun</button>
        <button onClick={() => redirectTo('/tic-tac-toe')}>Tic-Tac-Toe</button>
        <br /><br />
        {!email ? (
          <button onClick={() => redirectTo('/login')}>Login</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
