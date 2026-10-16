import React, { createContext, useContext, useEffect, useState } from 'react';

interface VisitorContextType {
  visitorName: string;
  setVisitorName: (name: string) => void;
  passNumber: string;
  isNamePromptOpen: boolean;
  setIsNamePromptOpen: (open: boolean) => void;
  isCardOpen: boolean;
  setIsCardOpen: (open: boolean) => void;
  submitName: (name: string) => void;
  currentTime: string;
  currentDate: string;
  greeting: string;
}

const VisitorContext = createContext<VisitorContextType>({
  visitorName: '',
  setVisitorName: () => {},
  passNumber: '#SD-26322',
  isNamePromptOpen: false,
  setIsNamePromptOpen: () => {},
  isCardOpen: true,
  setIsCardOpen: () => {},
  submitName: () => {},
  currentTime: '',
  currentDate: '',
  greeting: 'Good morning,',
});

function generatePassNumber(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `#SD-${randomNum}`;
}

export const VisitorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitorName, setVisitorName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('sd_visitor_name') || '';
    }
    return '';
  });

  const [passNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('sd_pass_number');
      if (saved) return saved;
      const newPass = '#SD-26322'; // default matching design reference or random
      sessionStorage.setItem('sd_pass_number', newPass);
      return newPass;
    }
    return '#SD-26322';
  });

  const [isNamePromptOpen, setIsNamePromptOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(true);

  // Live clock & Date
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
  const day = now.getDate();
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const year = now.getFullYear();
  const currentDate = `${dayName}, ${day} ${month} ${year}`;

  const currentTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';

  const submitName = (name: string) => {
    const finalName = name.trim() || 'Guest';
    setVisitorName(finalName);
    setIsNamePromptOpen(false);
    setIsCardOpen(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sd_visitor_name', finalName);
    }
  };

  return (
    <VisitorContext.Provider
      value={{
        visitorName,
        setVisitorName,
        passNumber,
        isNamePromptOpen,
        setIsNamePromptOpen,
        isCardOpen,
        setIsCardOpen,
        submitName,
        currentTime,
        currentDate,
        greeting,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitor = () => useContext(VisitorContext);
