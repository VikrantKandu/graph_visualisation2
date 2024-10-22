// // src/components/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Static values for demo purposes
//     const validEmail = "admin@example.com";
//     const validPassword = "password123";

//     if (email === validEmail && password === validPassword) {
//       onLogin(true); // Pass true to indicate successful login
//       navigate('/dashboard'); // Navigate to the dashboard
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// /// src/components/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios'; // Importing Axios

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             console.log("shivam111111 shiva");
//             // Use axios.post to send the email and password in the body
//             const response = await axios.post('http://localhost:8000/api/login', {
//                 email,
//                 password,
//             });
//             console.log(response,"shivam shiva");
//             if (response.status !== 200) {
//                 console.log(response,"shivam shiva1");
//                 throw new Error(response.data.message || 'Network response was not ok');
//             }

//             console.log(response.data);

//             // Navigate to dashboard or another route
//             navigate('/dashboard');
//         } catch (error) {
//              console.error('Error:', error);
//             // Set the error message
//             setError(error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Login</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = ({ onLogin }) => {  // Accepting the onLogin prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Sending email and password to the server
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            
            if (response.status === 200) {
                // Update the authentication state in App.js
                onLogin(true);
                // Navigate to the dashboard
                navigate('/dashboard');
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error) {
            // Display error message
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;

// import './Login.css'; // Import the custom CSS file
// import React from 'react';
// import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

// function Login() {
//   return (
//     <MDBContainer fluid className="p-3 my-5 h-custom">

//       <MDBRow>

//         <MDBCol col='10' md='6'>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//             className="img-fluid"
//             alt="Sample image"
//           />
//         </MDBCol>

//         <MDBCol col='4' md='6'>

//           <div className="d-flex flex-row align-items-center justify-content-center mb-4">
//             <p className="lead fw-normal mb-0 me-3">Sign in with</p>
//             <MDBBtn floating size='md' tag='a' className='me-2'>
//               <MDBIcon fab icon='facebook-f' />
//             </MDBBtn>
//             <MDBBtn floating size='md' tag='a' className='me-2'>
//               <MDBIcon fab icon='twitter' />
//             </MDBBtn>
//             <MDBBtn floating size='md' tag='a' className='me-2'>
//               <MDBIcon fab icon='linkedin-in' />
//             </MDBBtn>
//           </div>

//           <div className="divider d-flex align-items-center my-4">
//             <p className="text-center fw-bold mx-3 mb-0">Or</p>
//           </div>

//           <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
//           <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />

//           <div className="d-flex justify-content-between mb-4">
//             <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
//             <a href="#!">Forgot password?</a>
//           </div>

//           <div className='text-center text-md-start mt-4 pt-2'>
//             <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
//             <p className="small fw-bold mt-2 pt-1 mb-2">
//               Don't have an account? <a href="#!" className="link-danger">Register</a>
//             </p>
//           </div>

//         </MDBCol>

//       </MDBRow>

//       <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
//         <div className="text-white mb-3 mb-md-0">
//           Copyright © 2020. All rights reserved.
//         </div>
//         <div>
//           <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
//             <MDBIcon fab icon='facebook-f' size="md" />
//           </MDBBtn>
//           <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
//             <MDBIcon fab icon='twitter' size="md" />
//           </MDBBtn>
//           <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
//             <MDBIcon fab icon='google' size="md" />
//           </MDBBtn>
//           <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
//             <MDBIcon fab icon='linkedin-in' size="md" />
//           </MDBBtn>
//         </div>
//       </div>

//     </MDBContainer>
//   );
// }

// export default Login;
