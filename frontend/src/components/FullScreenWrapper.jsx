import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Warning from "./Warning";

const FullScreenWrapper = ({ children, examData }) => {
  const [violationCount, setViolationCount] = useState(-1);
  const [isWarning, setWarning] = useState(false);
  const navigate = useNavigate();

  // Load violation count from session storage on component mount
  useEffect(() => {
    const savedCount = sessionStorage.getItem('tabViolationCount');
    if (savedCount) {
      setViolationCount(parseInt(savedCount));
    }
  }, []);

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err.message);
      });
    }
  };

  const terminateExam = () => {
    // Auto-submit current progress
    navigate('/exam/finish', {
      state: {
        answers: examData?.code || '',
        testCases: examData?.results || [],
        terminated: true
      }
    });
    // Clear violation count
    sessionStorage.removeItem('tabViolationCount');
  };

  const handleViolation = () => {
    const newCount = violationCount + 1;
    setViolationCount(newCount);
    sessionStorage.setItem('tabViolationCount', newCount.toString());

    if (newCount >= 2) {
      // Third violation - terminate exam
      terminateExam();
    } else {
      setWarning(true);
    }
  };

  const handleReturn = () => {
    setWarning(false);
  };

  useEffect(() => {
    const handleBlur = () => {
      console.log('bluredddd');
      
      handleViolation();}
    const handleVisibilityChange = () => {
      console.log('visibility');
      if (document.hidden) {
        handleViolation();
      } else {
        handleReturn();
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [violationCount]);

  const preventKeys = (event) => {
    const blockedKeys = [
      "Escape",
      "F11",
      "Alt",
      "F5",
      "F12",
    ];

    if (blockedKeys.includes(event.key)) {
      event.preventDefault();
      //handleViolation();
    }
  };

  const disableRightClick = (event) => {
    event.preventDefault();
    handleViolation();
  };

  useEffect(() => {
    // Enter fullscreen mode as soon as the component mounts
    enterFullScreen();

    // Disable right-click and text selection
    document.addEventListener("contextmenu", disableRightClick);
    document.body.style.userSelect = "none";

    // Block keyboard shortcuts
    document.addEventListener("keydown", preventKeys);
    document.addEventListener("keypress", preventKeys);

    const preventWindowClose = (event) => {
      event.preventDefault();
      event.returnValue = "";
      handleViolation();
    };

    window.addEventListener("beforeunload", preventWindowClose);

    const checkFullscreen = setInterval(() => {
      if (!document.fullscreenElement) {
        enterFullScreen();
        handleViolation();
      }
    }, 1000);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", preventKeys);
      document.removeEventListener("keypress", preventKeys);
      window.removeEventListener("beforeunload", preventWindowClose);
      clearInterval(checkFullscreen);
      document.body.style.userSelect = "";
    };
  }, [handleViolation, violationCount]);

  return (
    <>
      {isWarning && (
        <Warning 
          onClose={() => setWarning(false)} 
          examData={examData}
          violationCount={violationCount}
        />
      )}
      <div id="full_screen">{children}</div>
    </>
  );
};

export default FullScreenWrapper;