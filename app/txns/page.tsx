"use client";

import useApi from "@/hooks/useApi";
import store, { RootState } from "@/redux/store";
import { txnSliceActions } from "@/redux/TxnSlice";
import {
  Button,
  divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  useSelect,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import emptyTxnsAnim from "../../res/lottie-anims/emptyTxnsAnim.json";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import { Txn } from "@/types";
import { Key } from "@react-types/shared/src/key";
import { commonSliceActions } from "@/redux/CommonSlice";

export default function TxnsPage() {
  const params = useSearchParams();
  const personId = params.get("personId");
  const people = useSelector((state: RootState) => state.people.data);
  const person = people.find((p) => p.id === +personId);
  const [showOnlyFilter, setShowOnlyFilter] = useState<"all" | Iterable<Key>>(
    "all"
  );
  const showOnlyOptions = ["paid", "un paid"];
  const [searchValue, setSearchValue] = useState("");

  const txnApi = useApi<Array<Txn>>({
    url: `transaction/all?PersonId=${personId}`,
    method: "GET",
  });

  const AddTxnClickHandler = () => {
    store.dispatch(commonSliceActions.setAddTxnVisibility(true));
  };

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  }

  let list = useAsyncList({
    async load({ signal }) {
      let res = await txnApi.executeAsync();

      return {
        items: res.data,
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const columns = [
    {
      key: "date",
      label: "Date",
    },
    {
      key: "amount",
      label: "Orig. Amount",
    },
    {
      key: "hair_color",
      label: "hair_color",
    },
  ];

  const classNames = useMemo(
    () => ({
      // wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    }),
    []
  );

  return (
    <div className="txnsPageRoot">
      <div className="txnsPageHeader flex justify-between p-4">
        <div className="txnTitle">{`Transactions with {person.name"} `}</div>
        <div className="txnHeaderOpts flex items-center gap-4">
          <Input
            isClearable
            classNames={{
              base: "max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={searchValue}
            onClear={() => setSearchValue("")}
            onValueChange={setSearchValue}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<ExpandMoreIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Show only
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={showOnlyFilter}
              selectionMode="multiple"
              onSelectionChange={setShowOnlyFilter}
            >
              {showOnlyOptions.map((opt) => (
                <DropdownItem key={opt} className="capitalize">
                  {capitalize(opt)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            onPress={AddTxnClickHandler}
            className="bg-foreground text-background"
            endContent={<AddIcon />}
            size="sm"
          >
            Add New
          </Button>
        </div>
      </div>

      <Table
        removeWrapper
        classNames={classNames}
        selectionMode="multiple"
        color="primary"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={txnApi.loading}
          items={list.items}
          emptyContent={
            <Lottie
              //lottieRef={lottieRef}
              animationData={emptyTxnsAnim}
              loop={false}
              //onComplete={handleAnimationComplete}
              //className="moneyHandAnim w-1/2"
            />
          }
          loadingContent={<div>Loading...</div>}
        >
          {(item: Txn) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
