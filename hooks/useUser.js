"use client";

import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setFullName(parsedUser.name || parsedUser.email);
          setInitials(getInitials(parsedUser.name || parsedUser.email));
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
          setUser(null);
        }
      }
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else if (name.length > 0) {
      return name[0].toUpperCase();
    }
    return '';
  };

  return { user, fullName, initials };
}