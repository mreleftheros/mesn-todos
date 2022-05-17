import { writable } from 'svelte/store';

const _todos = writable([]);

const getAll = async () => {
  try {
    const res = await fetch('/api/todos');
    const data = await res.json();
    if (!data.error) {
      _todos.set(data);
    }
  } catch (err) {
    throw err.message;
  }
};

const update = async (id, body) => {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!data.error) {
      _todos.update(t =>
        t.map(todo => (todo._id === id ? { ...todo, ...body } : todo))
      );
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};

const remove = async id => {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data === true) {
      _todos.update(t => t.filter(todo => todo._id !== id));
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};

const set = async text => {
  try {
    const res = await fetch('api/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();

    if (!data.error) {
      _todos.update(t => [data, ...t]);
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};

const reset = () => _todos.set([]);

export const todos = {
  subscribe: _todos.subscribe,
  getAll,
  update,
  remove,
  set,
  reset
};
