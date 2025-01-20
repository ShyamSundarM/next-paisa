"use client";

import "./styles.css";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { Tabs, Tab } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTab, setSelectedTab] = useState("signin");

  function getHeightOfForm() {
    if (selectedTab === "signin") {
      return 300;
    } else {
      return 400;
    }
  }

  return (
    <div className="authLayoutRoot flex w-full h-full">
      <div className="leftPart" style={{ flex: "0 0 70%" }}>
        {children}
      </div>
      <div
        className="rightPart flex justify-center items-center"
        style={{ flex: "0 0 30%" }}
      >
        <div
          className="signInUpCard flex flex-col justify-center items-center w-fit"
          style={{ height: getHeightOfForm() + "px" }}
        >
          <Tabs
            className="tabs"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key.toString())}
          >
            <Tab key="signin" title="Login">
              <SignIn />
            </Tab>
            <Tab key="signup" title="Register">
              <SignUp setSelectedTab={setSelectedTab} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
