import { CircularProgress, Form } from "@heroui/react";
import { Input, Button } from "@heroui/react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MailIcon } from "./ForgotPasswordModal";
import useApi from "@/hooks/useApi";
import { toast } from "react-toastify";

export type FieldDetails = {
  value: string;
  errMsg: string;
  isTouched: boolean;
  isSuccess?: boolean;
};

type Props = {
  setSelectedTab: (key: string) => void;
};

export default function SignUp(props: Props) {
  const [rePwdDetails, setRePwdDetails] = useState<FieldDetails>({
    value: "",
    errMsg: "",
    isTouched: false,
  });
  const [rePwdVisible, setRePwdVisible] = useState(false);
  const [userNameDetails, setUserNameDetails] = useState<FieldDetails>({
    value: "",
    errMsg: "",
    isTouched: false,
    isSuccess: false,
  });
  const [pwdDetails, setPwdDetails] = useState<FieldDetails>({
    value: "",
    errMsg: "",
    isTouched: false,
  });

  const registerApi = useApi({
    url: `auth/Register`,
    method: "post",
  });

  const unameCheckApi = useApi({
    url: `auth/UNameAvailable/${userNameDetails?.value ?? ""}`,
  });

  async function ValidateUName() {
    const resp = await unameCheckApi.executeAsync();
    if (resp.status === 200) {
      if (resp.data) {
        setUserNameDetails((prev) => ({
          ...prev,
          errMsg: "",
          isSuccess: true,
        }));
      } else {
        setUserNameDetails((prev) => ({
          ...prev,
          errMsg: "UserName UnAvailable",
          isSuccess: false,
        }));
      }
    } else {
      toast("Error in checking username availability");
    }
  }

  //for username availability check
  useEffect(() => {
    if (userNameDetails.isTouched) {
      if (userNameDetails.value.length < 4) {
        setUserNameDetails((prev) => ({
          ...prev,
          errMsg: "Username should be atleast 4 characters long",
        }));
      } else {
        setUserNameDetails((prev) => ({
          ...prev,
          errMsg: "",
        }));
        var timer = setTimeout(() => {
          ValidateUName();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [userNameDetails.value]);

  return (
    <Form
      className="signUpForm w-full flex flex-col gap-4"
      validationBehavior="native"
      //onReset={}
      onSubmit={async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        console.log(data);
        registerApi.SetRequestBody({
          userName: data.username,
          email: data.email,
          password: data.password,
        });
        var resp = await registerApi.executeAsync();
        if (resp.status === 200) {
          if (resp.data === 1) {
            toast("Registration Successful");
            props.setSelectedTab("signin");
          }

          if (resp.data === 0) {
            toast("UserName already exists");
          }

          if (resp.data === 2) {
            toast("EmailAddress already exists");
          }
        } else {
          toast("Network Error");
        }
      }}
    >
      <Input
        isRequired
        description={userNameDetails.isSuccess && "Username available"}
        minLength={4}
        errorMessage={userNameDetails.errMsg}
        isInvalid={userNameDetails.errMsg.length > 0}
        name="username"
        placeholder="Enter your username"
        type="text"
        startContent={<AccountBoxIcon />}
        endContent={unameCheckApi.loading && <CircularProgress size="sm" />}
        onValueChange={(val) =>
          setUserNameDetails((prev) => ({
            ...prev,
            value: val,
            isTouched: true,
          }))
        }
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        name="email"
        placeholder="Email Address"
        type="email"
        startContent={<MailIcon />}
      />
      <Input
        isRequired
        errorMessage=""
        name="password"
        placeholder="Password"
        type="password"
        value={pwdDetails.value}
        onValueChange={(val) =>
          setPwdDetails((prev) => ({ ...prev, value: val, isTouched: true }))
        }
        startContent={<LockIcon />}
      />
      <Input
        isRequired
        errorMessage="Passwords donot match"
        isInvalid={
          rePwdDetails.isTouched && rePwdDetails.value !== pwdDetails.value
        }
        name="rePassword"
        placeholder="Re-Enter Password"
        type={rePwdVisible ? "text" : "password"}
        endContent={
          <Button
            className="input-icon"
            size="sm"
            onPress={() => setRePwdVisible((vis) => !vis)}
            isIconOnly
          >
            {rePwdVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        }
        startContent={<LockIcon />}
        value={rePwdDetails.value}
        onValueChange={(val) =>
          setRePwdDetails((prev) => ({ ...prev, value: val, isTouched: true }))
        }
      />
      <Button
        className="submitBtn"
        color="primary"
        type="submit"
        isLoading={registerApi.loading}
      >
        SignUp
      </Button>
    </Form>
  );
}
