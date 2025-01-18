"use client";

import "../app/auth/styles.css";
import { Form, Link } from "@heroui/react";
import { Input, Button } from "@heroui/react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";

export default function SignIn() {
  const [pwdVisible, setPwdVisible] = useState(false);
  return (
    <Form
      className="w-full flex flex-col gap-4"
      validationBehavior="native"
      //onReset={}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        name="username"
        placeholder="Enter your username"
        type="text"
        startContent={<AccountBoxIcon />}
      />

      <Input
        isRequired
        errorMessage=""
        name="password"
        placeholder="Password"
        type={pwdVisible ? "text" : "password"}
        endContent={
          <Button
            className="input-icon"
            size="sm"
            onPress={() => setPwdVisible((vis) => !vis)}
            isIconOnly
          >
            {pwdVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        }
        startContent={<LockIcon />}
      />
      <Link className="forgotPwd">Forgot password?</Link>
      <Button color="primary" type="submit" className="submitBtn">
        Submit
      </Button>
    </Form>
  );
}
