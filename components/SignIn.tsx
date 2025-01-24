"use client";

import "../app/auth/styles.css";
import { Form, Link, Alert } from "@heroui/react";
import { Input, Button } from "@heroui/react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import store from "@/redux/store";
import { commonSliceActions } from "@/redux/CommonSlice";
import useApi from "@/hooks/useApi";
import { authSliceActions } from "@/redux/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types";

export default function SignIn() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const router = useRouter();
  function forgotPwdClickHandler() {
    store.dispatch(commonSliceActions.setForgotPwdVisibility(true));
  }

  const loginApi = useApi<LoginResponse>({
    url: "auth/login",
    method: "POST",
  });

  return (
    <Form
      className="signInForm w-full flex flex-col gap-4"
      validationBehavior="native"
      //onReset={}
      onSubmit={async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        //console.log(data);
        loginApi.SetRequestBody({
          userName: data.username,
          password: data.password,
        });
        var resp = await loginApi.executeAsync();
        if (resp.status === 200) {
          if (resp.data.token !== null) {
            store.dispatch(authSliceActions.Set(resp.data));
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("expiresIn", resp.data.expiresIn);
            //navigate("/homepage");
            router.replace("home");
          } else {
            toast("Invalid UserName/Password");
          }
        } else {
          toast("Network Error");
        }
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
      <Link className="forgotPwd" onPress={forgotPwdClickHandler}>
        Forgot password?
      </Link>
      <Button
        color="primary"
        type="submit"
        className="submitBtn"
        isLoading={loginApi.loading}
      >
        Sign In
      </Button>
    </Form>
  );
}
