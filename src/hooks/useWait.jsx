import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WaitingContext = React.createContext({});

export const useWait = () => useContext(WaitingContext);

let _waiters = [];

export const WaitingProvider = ({ children }) => {
  const [waiters, setWaiters] = useState([]);

  const isWaiting = (name) => {
    return waiters.includes(name);
  };

  const anyWaiting = (names) => {
    if (!names) {
      return waiters.length > 0;
    }

    return Array.isArray(names)
      ? names.some((name) => isWaiting(name))
      : isWaiting(names);
  };

  const startWaiting = (nameOrNames) => {
    const newWaiters = [].concat(nameOrNames);

    if (newWaiters.length === 0) {
      return;
    }

    _waiters = [..._waiters, ...newWaiters];

    setWaiters(_waiters);
  };

  const endWaiting = (nameOrNames) => {
    const names = [].concat(nameOrNames);

    names.forEach((name) => {
      const index = _waiters.indexOf(name);
      if (index > -1) {
        _waiters.splice(index, 1);
      }
    });

    setWaiters(_waiters);
  };

  const endAllWaiting = () => setWaiters([]);

  return (
    <WaitingContext.Provider
      value={{
        waiters,
        isWaiting,
        anyWaiting,
        startWaiting,
        endWaiting,
        endAllWaiting,
      }}
    >
      {children}
    </WaitingContext.Provider>
  );
};

WaitingProvider.propTypes = {
  children: PropTypes.node,
};
