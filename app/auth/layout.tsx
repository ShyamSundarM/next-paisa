"use client";

import "./styles.css";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { Tabs, Tab } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="authLayoutRoot flex w-full h-full">
      <div className="leftPart" style={{ flex: "0 0 70%" }}>
        {children}
      </div>
      <div
        className="rightPart flex justify-center items-center"
        style={{ flex: "0 0 30%" }}
      >
        <div className="signInUpCard flex flex-col justify-center items-center w-fit">
          <Tabs>
            <Tab key="signin" title="Login">
              <Card>
                <CardBody>
                  <SignIn />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="signup" title="Register">
              <Card>
                <CardBody>
                  <SignUp />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
