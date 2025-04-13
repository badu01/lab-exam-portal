import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Warning from "./Warning";

const FullScreenWrapper = ({ children, examData }) => {
  const [violationCount, setViolationCount] = useState(-1);
  const [isWarning, setWarning] = useState(false);
  const [lastViolationTime, setLastViolationTime] = useState(0);
  const navigate = useNavigate();

  // Load violation count from session storage on component mount
  useEffect(() => {
    const savedCount = sessionStorage.getItem("tabViolationCount");
    if (savedCount) {
      setViolationCount(parseInt(savedCount));
    }
  }, []);

  const enterFullScreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err.message);
      });
    }
  }, []);

  const terminateExam = useCallback(() => {
    navigate("/exam/finish", {
      state: {
        answers: examData?.code || "",
        testCases: examData?.results || [],
        terminated: true,
      },
    });
    sessionStorage.removeItem("tabViolationCount");
  }, [navigate, examData]);

  const handleViolation = useCallback(() => {
    const now = Date.now();
    // Prevent multiple violations within 1 second
    if (now - lastViolationTime < 1000) return;

    setLastViolationTime(now);
    const newCount = violationCount + 1;
    setViolationCount(newCount);
    sessionStorage.setItem("tabViolationCount", newCount.toString());

    if (newCount >= 2) {
      terminateExam();
    } else {
      setWarning(true);
    }
  }, [violationCount, lastViolationTime, terminateExam]);

  // const handleReturn = useCallback(() => {
  //   setWarning(false);
  // }, []);

  const preventKeys = useCallback((event) => {
    const blockedKeys = ["Escape", "F11", "Alt", "F5", "F12"];
    if (blockedKeys.includes(event.key)) {
      event.preventDefault();
      handleViolation();
    }
  }, [handleViolation]);

  const disableRightClick = useCallback((event) => {
    event.preventDefault();
    handleViolation();
  }, [handleViolation]);

  useEffect(() => {
    const handleBlur = () => {
      if (!isWarning) {
        handleViolation();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !isWarning) {
        handleViolation();
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isWarning, handleViolation]);

  useEffect(() => {
    enterFullScreen();

    // Disable right-click and text selection
    document.addEventListener("contextmenu", disableRightClick);
    document.body.style.userSelect = "none";

    // Block keyboard shortcuts
    document.addEventListener("keydown", preventKeys);

    const preventWindowClose = (event) => {
      event.preventDefault();
      event.returnValue = "";
      if (!isWarning) {
        handleViolation();
      }
    };

    window.addEventListener("beforeunload", preventWindowClose);

    const checkFullscreen = setInterval(() => {
      if (!document.fullscreenElement && !isWarning) {
        enterFullScreen();
        handleViolation();
      }
    }, 1000);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", preventKeys);
      window.removeEventListener("beforeunload", preventWindowClose);
      clearInterval(checkFullscreen);
      document.body.style.userSelect = "";
    };
  }, [enterFullScreen, disableRightClick, preventKeys, handleViolation, isWarning]);

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