import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import styled, { keyframes } from "styled-components";
import Particles from "react-tsparticles";

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: #007bff; }
`;

const hitAndFall = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const GlowTextContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
  color: lightblue;
  text-shadow: 0 0 20px lightblue, 0 0 30px lightblue;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #007bff, #00c6ff);
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 50px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  margin-left: 30px;
  z-index: 1;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: left;
  color: #007bff;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 15px;
`;

const TypingText = styled.h2`
  font-size: 2.5em;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #007bff;
  animation: ${typing} 6s steps(40, end) infinite alternate, ${blinkCaret} 0.75s step-end infinite;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 1;
`;

const Dot = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  box-shadow : 0 0 20px ${props => props.color}, 0 0 40px ${props => props.color};
`;

const BouncingDots = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const createDots = () => {
      const colors = ['#007bff', '#00c6ff', '#0056b3', '#004085', '#80d3ff'];
      const newDots = Array.from({ length: 5 }).map(() => ({
        id: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        position: {
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
        },
        direction: {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4,
        },
        speed: Math.random() * 4 + 2,
      }));
      setDots(newDots);
    };

    createDots();
    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.map(dot => {
          const newTop = parseFloat(dot.position.top) + (dot.direction.y * dot.speed) + 'px';
          const newLeft = parseFloat(dot.position.left) + (dot.direction.x * dot.speed) + 'px';

          if (parseFloat(newTop) <= 0 || parseFloat(newTop) >= window.innerHeight - 20) {
            dot.direction.y *= -1;
          }
          if (parseFloat(newLeft) <= 0 || parseFloat(newLeft) >= window.innerWidth - 20) {
            dot.direction.x *= -1;
          }

          return {
            ...dot,
            position: {
              top: newTop,
              left: newLeft,
            },
          };
        });
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {dots.map(dot => (
        <Dot key={dot.id} style={{ top: dot.position.top, left: dot.position.left }} color={dot.color} />
      ))}
    </>
  );
};

const Letter = styled.span`
  display: inline-block;
  animation: ${hitAndFall} 1.3s forwards, ${hitAndFall} 1.3s forwards;
  opacity: 0;
  font-size: 2em;
  text-shadow: 0 0 10px rgba(0, 123, 255, 0.8);
  animation: ${hitAndFall} 1.3s forwards infinite;
`;

const AnimatedText = ({ text }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const splitText = text.split('');
    setLetters(splitText);
  }, [text]);

  return (
    <div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'center', marginBottom: '40px' }}>
      {letters.map((letter, index) => (
        <Letter key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {letter}
        </Letter>
      ))}
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <Container>
      <GlowTextContainer>
        <AnimatedText text="Have A Nice Day!" />
      </GlowTextContainer>
      <Particles
        options={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
      <FormContainer>
        {isError && <ErrorMessage>{message}</ErrorMessage>}
        <Title>Sign In</Title>
        <form onSubmit={Auth}>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
          <Button type="submit">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </FormContainer>
      <RightColumn>
        <TypingText>Role Based Access Control Development</TypingText>
      </RightColumn>
      <BouncingDots />
    </Container>
  );
};

export default Login;