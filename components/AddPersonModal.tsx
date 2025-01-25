"use client";

import useApi from "@/hooks/useApi";
import { commonSliceActions } from "@/redux/CommonSlice";
import store, { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  useSelect,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FieldDetails } from "./SignUp";
import { toast } from "react-toastify";

export default function App() {
  const open = useSelector(
    (state: RootState) => state.common.addPersonModalVisible
  );

  useEffect(() => {
    if (!open) {
      setPersonDetails({
        value: "",
        errMsg: "",
        isTouched: false,
      });
    }
  }, [open]);

  const [personDetails, setPersonDetails] = useState<FieldDetails>({
    value: "",
    errMsg: "",
    isTouched: false,
  });

  function onOpenChange(isOpen: boolean) {
    store.dispatch(commonSliceActions.setAddPersonVisibility(isOpen));
  }

  const addPersonApi = useApi({
    url: "people/add?name=" + personDetails.value,
    method: "POST",
  });

  async function SubmitClickHandler() {
    if (personDetails.value.length <= 3) {
      setPersonDetails((prev) => ({
        ...prev,
        errMsg: "Name too short",
      }));
    } else {
      var resp = await addPersonApi.executeAsync();
      if (resp.status === 200) {
        toast.success("Person added successfully");
        onOpenChange(false);
      } else {
        toast.error(resp.statusText);
      }
    }
  }

  return (
    <>
      <Modal
        isOpen={open}
        placement="top-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Person
              </ModalHeader>
              <ModalBody>
                <Input
                  isInvalid={
                    personDetails.isTouched && personDetails.errMsg.length > 0
                  }
                  value={personDetails.value}
                  label="name"
                  placeholder="Enter person name"
                  variant="bordered"
                  onValueChange={(val) =>
                    setPersonDetails((prev) => ({
                      ...prev,
                      value: val,
                      isTouched: true,
                    }))
                  }
                  minLength={4}
                  errorMessage="Name too short"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={SubmitClickHandler}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
