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
import useApi from "@/hooks/useApi";
import { toast } from "react-toastify";

export default function TransactionModal() {
  const open = useSelector(
    (state: RootState) => state.common.addTxnModalVisible
  );

  const [isBorrow, setIsBorrow] = useState(false);

  const upsertTxnApi = useApi({
    url: "transaction/upsert",
    method: "post",
  });

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
              onSubmit={async (e) => {
                e.preventDefault();
                let data = Object.fromEntries(new FormData(e.currentTarget));

                console.log(data);

                var payload = {
                  //id: 0,
                  personId,
                  amount: +data.amount,
                  date: data.date,
                  txnDirection: isBorrow ? 1 : 0,
                  reason: data.reason,
                  txnReference: data.txnReference,
                  isSettled: false,
                };

                upsertTxnApi.SetRequestBody(payload);
                var resp = await upsertTxnApi.executeAsync();
                if (resp.status === 200) {
                  onClose();
                  store.dispatch(commonSliceActions.setTxnsRefresh(true));
                } else {
                  toast(resp.statusText);
                }
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                Add Transaction
              </ModalHeader>
              <ModalBody>
                <Input
                  name="reason"
                  label="Txn Notes"
                  variant="bordered"
                  type="text"
                  required
                />
                <div className="flex gap-2">
                  <Input
                    name="amount"
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
                    name="txnDirection"
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
                  name="txnReference"
                  label="Txn Reference"
                  type="text"
                  variant="bordered"
                  required
                />
                <Input
                  name="date"
                  label="Date"
                  type="date"
                  variant="bordered"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={upsertTxnApi.loading}
                >
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
