"use client";

import useApi from "@/hooks/useApi";
import store, { RootState } from "@/redux/store";
import { txnSliceActions } from "@/redux/TxnSlice";
import "./styles.css";
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

  //handle showOnly filter change
  function showOnlyChangeHandler(value: Iterable<Key>) {
    setShowOnlyFilter(value);
    //console.log(value);
    //const valueArray = Array.from(value);
  }

  const [searchValue, setSearchValue] = useState("");

  const txnApi = useApi<Array<Txn>>({
    url: `transaction/all?PersonId=${personId}`,
    method: "GET",
  });

  const triggerTxnsRefresh = useSelector(
    (state: RootState) => state.common.triggerTxnsRefresh
  );

  //listen for refresh
  useEffect(() => {
    if (triggerTxnsRefresh) {
      list.reload();
      store.dispatch(commonSliceActions.setTxnsRefresh(false));
    }
  }, [triggerTxnsRefresh]);

  const AddTxnClickHandler = () => {
    store.dispatch(commonSliceActions.setAddTxnVisibility(true));
  };

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  }

  let list = useAsyncList<Txn>({
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

  // var txns: Txn[] = [];
  // if (showOnlyFilter === "all") {
  //   txns = list.items;
  // } else {
  //   const valueArray = Array.from(showOnlyFilter);
  //   if (valueArray.includes("paid")) {
  //     txns = list.items.filter((txn) => txn.isSettled === true);
  //   } else if (valueArray.includes("un paid")) {
  //     txns = list.items.filter((txn) => txn.isSettled === false);
  //   }
  // }

  const columns = [
    { key: "reason", label: "Reason" },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "amount",
      label: "Orig. Amount",
    },
    {
      key: "txnReference",
      label: "Txn Reference",
    },
  ];

  const classNames = useMemo(
    () => ({
      // wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      //table: ["h-full"],
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
              onSelectionChange={showOnlyChangeHandler}
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

      <div className="tableContainer">
        <Table
          removeWrapper
          classNames={classNames}
          selectionMode="multiple"
          color="primary"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          isHeaderSticky
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={txnApi.loading}
            items={list.items} //list.items
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
    </div>
  );
}
