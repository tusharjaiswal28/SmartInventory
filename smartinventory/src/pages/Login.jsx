import { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, set, ref, db, get, child } from '../firebase';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');

  const handleAuth = async () => {
    try {
      if (isRegister) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(db, 'users/' + userCred.user.uid), { email, role });
        onLogin(userCred.user, role);
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const snapshot = await get(child(ref(db), 'users/' + userCred.user.uid));
        const storedRole = snapshot.exists() ? snapshot.val().role : 'viewer';
        onLogin(userCred.user, storedRole);
      }
    } catch (err) {
      setError(err.message);
    }
  };

 return (
    <div style={{ padding: '20px' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      {isRegister && (
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      )}
      <button onClick={handleAuth}>{isRegister ? 'Sign Up' : 'Login'}</button>
      <p style={{ color: 'red' }}>{error}</p>
      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', color: 'blue' }}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>
    </div>
  );
}
export default Login;