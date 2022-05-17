import { writable } from 'svelte/store';
import { todos } from './todos';

const _auth = writable(null);

const login = async (username, password) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!data.error) {
      _auth.set(data);
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};

const signup = async (username, password) => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!data.error) {
      _auth.set(data);
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};

const logout = async () => {
  try {
    const res = await fetch('/api/auth/logout');
    const data = await res.json();

    if (data === true) {
      _auth.set(null);
      todos.reset();
    }
  } catch (err) {
    _auth.set(null);
  }
};

const getUser = async () => {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    if (!data.error) {
      return _auth.set(data);
    }
  } catch (err) {
    _auth.set(null);
  }
};

export const auth = {
  subscribe: _auth.subscribe,
  getUser,
  login,
  signup,
  logout,
};
