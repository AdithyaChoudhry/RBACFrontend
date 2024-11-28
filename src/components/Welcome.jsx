import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from 'react-spring';
import styled, { keyframes } from 'styled-components';

// Background Animation
const moveBackground = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const Container = styled(animated.div)`
  padding: 40px;
  height: 130vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: linear-gradient(135deg, rgba(25, 25, 112, 0.8) 0%, rgba(30, 144, 255, 0.8) 100%);
  background-size: 200% 200%;
  animation: ${moveBackground} 10s ease infinite;
  transition: background 0.5s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  max-width: 1400px;
  margin: auto;
  position: relative;
  color: #fff;
`;

const Title = styled(animated.h1)`
  font-size: 3em;
  margin: 0;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  top: 20px;
  left: 20px;
`;

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const StyledSubtitle = styled(animated.h2)`
  font-size: 1.8em;
  text-shadow: 1px 1px 5px rgba(5, 0.7, 0, 4.9);
  position: absolute;
  animation: ${scroll} 10s linear infinite;
  margin-top: 100px;
  left: 20px;
  color: ${props => props.color}; // Use dynamic color prop
`;

const DotAnimation = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(50px, -50px); }
  50% { transform: translate(0, -100px); }
  75% { transform: translate(-50px, -50px); }
  100% { transform: translate(0, 0); }
`;

const Dot = styled(animated.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  box-shadow: 0 0 20px ${props => props.color}, 0 0 40px ${props => props.color};
  animation: ${DotAnimation} 3s ease-in-out infinite alternate;
`;

const neonColors = [
  'rgba(0, 255, 255, 1)', // Cyan
  'rgba(255, 0, 255, 1)', // Magenta
  'rgba(255, 255, 0, 1)', // Yellow
  'rgba(0, 255, 0, 1)',   // Lime
  'rgba(255, 165, 0, 1)', // Orange
];

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [isColliding, setIsColliding] = useState(false);

  const titleAnimation = useSpring({
    opacity: user ? 1 : 0,
    transform: user ? 'translateY(0px)' : 'translateY(-30px)',
    config: { tension: 280, friction: 12 },
  });

  const nameAnimation = useSpring({
    opacity: user ? 1 : 0,
    transform: user ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 300, friction: 10 },
  });

  const backgroundAnimation = useSpring({
    background: user ? 'linear-gradient(135deg, #1e1e1e 0%, #007acc 100%)' : 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    const collide = () => {
      setIsColliding(true);
      setTimeout(() => {
        setIsColliding(false);
      }, 1000);
    };

    const interval = setInterval(collide, 5000);

    return () => clearInterval(interval);
  }, [setIsColliding]);

  const getNeonColor = () => {
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  };

  const getSubtitleColor = () => {
    return user ? '#00ff00' : '#000000'; // Example colors based on user state
  };

  return (
    <Container style={backgroundAnimation}>
      <Title style={titleAnimation}>Welcome, {user ? user.name : 'Guest'}!</Title>
      <StyledSubtitle style={nameAnimation} color={getSubtitleColor()}>
        {user ? `It's great to see you here, ${user.name}!` : 'Please log in to continue.'}
      </StyledSubtitle>
      {isColliding && <div style={{ color: 'red', position: 'absolute', top: '20px', left: '20px' }}>Collision Detected!</div>}
      <Dot style={{ top: '40%', left: '10%' }} size={20 + Math.random() * 30} color={getNeonColor()} />
      <Dot style={{ top: '50%', left: '30%' }} size={20 + Math.random() * 30} color={getNeonColor()} />
      <Dot style={{ top: '30%', left: '50%' }} size={20 + Math.random() * 30} color={getNeonColor()} />
      <Dot style={{ top: '60%', left: '70%' }} size={20 + Math.random() * 30} color={getNeonColor()} />
      <Dot style={{ top: '40%', left: '90%' }} size={20 + Math.random() * 30} color={getNeonColor()} />
      <Dot style={{ top: '50%', left: '80%' }} size={20 + Math.random() * 30} color={getNeonColor()} />
    </Container>
  );
};

export default Welcome;
