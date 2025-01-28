"use client";

import { commonSliceActions } from "@/redux/CommonSlice";
import store, { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  Form,
} from "@heroui/react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FieldDetails } from "./SignUp";
import { useSearchParams } from "next/navigation";

export default function TransactionModal() {
  const open = useSelector(
    (state: RootState) => state.common.addTxnModalVisible
  );

  const [isBorrow, setIsBorrow] = useState(false);

  const [amountDetails, setAmountDetails] = useState<FieldDetails>({
    value: "",
    errMsg: "",
    isTouched: false,
  });

  function onOpenChange(isOpen: boolean) {
    store.dispatch(commonSliceActions.setAddTxnVisibility(isOpen));
  }

  const params = useSearchParams();
  const personId = params.get("personId");
  const people = useSelector((state: RootState) => state.people.data);
  const person = people.find((p) => p.id === +personId);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      formRef.current.classList.value = "";
    }
  }, [open]);

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
            <Form
              className="flex-none"
              ref={formRef}
              validationBehavior="native"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                Add Transaction
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Txn Notes"
                  variant="bordered"
                  type="text"
                  required
                />
                <div className="flex gap-2">
                  <Input
                    required
                    value={amountDetails.value}
                    onValueChange={(val) =>
                      setAmountDetails((prev) => ({ ...prev, value: val }))
                    }
                    startContent={<CurrencyRupeeIcon />}
                    type="number"
                    variant="bordered"
                  />
                  <Checkbox
                    isSelected={isBorrow}
                    onValueChange={setIsBorrow}
                    classNames={{
                      label: "text-small whitespace-nowrap",
                    }}
                  >
                    Is Borrow ?
                  </Checkbox>
                </div>
                <div>{`You are ${isBorrow ? "borrowing" : "lending"} ${amountDetails.value === "" ? "0" : amountDetails.value}/- ${
                  isBorrow ? "from" : "to"
                } ${person?.name ?? ""}`}</div>

                <Input
                  label="Txn Reference"
                  type="text"
                  variant="bordered"
                  required
                />
                <Input label="Date" type="date" variant="bordered" required />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
