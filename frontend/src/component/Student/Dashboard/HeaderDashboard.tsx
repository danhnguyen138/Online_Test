import { useState, useEffect } from 'react';
export default function HeaderDashboard() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    updateGreeting();

    const intervalId = setInterval(() => {
      updateGreeting();
    }, 60000); // Cập nhật mỗi phút

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateGreeting = () => {
    let newGreeting = '';

    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    setGreeting(newGreeting);
  };
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const currentDateFormat = currentDate.toLocaleDateString('en-US', options);
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div
        className="h2"
        style={{
          color: '#153462',
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '0.02em',
        }}
      >
        {greeting}
        <div className="h5 mt-2">Hi there.</div>
      </div>
      <div className="h5" style={{}}>
        Today
        <div
          className="h5 mt-2"
          style={{
            color: '#153462',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          {currentDateFormat}
        </div>
      </div>
    </div>
  );
}
