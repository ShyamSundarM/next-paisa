"use client";

import Lottie from "lottie-react";
import { useRef, useState } from "react";
import moneyHandAnim from "../../res/lottie-anims/moneyHandTransferAnim.json";

export default function AuthPage() {
  const lottieRef = useRef(null);
  const [animVisible, setAnimVisible] = useState(true);

  const handleAnimationComplete = () => {
    setAnimVisible(false);
  };

  return (
    <div
      className={`authPageRoot w-full h-full items-center flex ${animVisible ? "justify-center" : ""}`}
    >
      {animVisible && (
        <Lottie
          lottieRef={lottieRef}
          animationData={moneyHandAnim}
          loop={false}
          onComplete={handleAnimationComplete}
          className="moneyHandAnim w-1/2"
        />
      )}
      {!animVisible && (
        <div className="mainText">
          <div className="welcomeText">Welcome to ManagePaisa</div> Your one
          stop solution to manage all transactions in one place.
        </div>
      )}
    </div>
  );
}
