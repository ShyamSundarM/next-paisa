import { Form } from "@heroui/react";
import { Input, Button } from "@heroui/react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function SignUp() {
  const [pwdVisible, setPwdVisible] = useState(false);

  return (
    <Form
      className="signUpForm w-full flex flex-col gap-4"
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
        errorMessage="Please enter a valid email"
        name="email"
        placeholder="Email Address"
        type="email"
      />
      <Input
        isRequired
        errorMessage=""
        name="password"
        placeholder="Password"
        type="password"
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
      <Input
        isRequired
        errorMessage=""
        name="rePassword"
        placeholder="Re-Enter Password"
        type="password"
      />
      <Button className="submitBtn" color="primary" type="submit">
        SignUp
      </Button>
    </Form>
  );
}
