"use client";
export const dynamic = "force-static";

import useApi from "@/hooks/useApi";
import store, { RootState } from "@/redux/store";
import "./styles.css";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
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
import { Txn } from "@/types";
import { Key } from "@react-types/shared/src/key";
import { commonSliceActions } from "@/redux/CommonSlice";
import { toast } from "react-toastify";

export default function TxnsPage() {
  const params = useSearchParams();
  const personId = params.get("personId");
  const people = useSelector((state: RootState) => state.people.data);
  const person = people.find((p) => p.id === +personId);
  const [showOnlyFilter, setShowOnlyFilter] = useState<"all" | Iterable<Key>>(
    "all"
  );
  const showOnlyOptions = ["paid", "un paid"];
  const [dbTxns, setDbTxns] = useState<Array<Txn>>([]);
  const [filteredTxns, setFilteredTxns] = useState<Array<Txn>>([]);

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

  async function fetchTxns() {
    var resp = await txnApi.executeAsync();
    if (resp.status === 200) {
      setDbTxns(resp.data);
    } else {
      toast.error("Failed to load transactions");
    }
  }

  //filter txns
  useEffect(() => {
    var txns: Array<Txn> = [];
    var showOnlyFilterArray = Array.from(showOnlyFilter);

    //show only filter
    if (
      showOnlyFilter === "all" ||
      (showOnlyFilterArray.includes("paid") &&
        showOnlyFilterArray.includes("un paid"))
    ) {
      txns = dbTxns;
    } else if (showOnlyFilterArray.includes("paid")) {
      txns = dbTxns.filter((txn) => txn.isSettled === true);
    } else {
      txns = dbTxns.filter((txn) => txn.isSettled === false);
    }

    //search filter
    if (searchValue) {
      txns = txns.filter((txn) =>
        txn.reason.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredTxns(txns);
  }, [dbTxns, showOnlyFilter, searchValue]);

  //load txns
  useEffect(() => {
    fetchTxns();
  }, [personId]);

  //listen for refresh
  useEffect(() => {
    if (triggerTxnsRefresh) {
      // todo list.reload();
      store.dispatch(commonSliceActions.setTxnsRefresh(false));
    }
  }, [triggerTxnsRefresh]);

  const AddTxnClickHandler = () => {
    store.dispatch(commonSliceActions.setAddTxnVisibility(true));
  };

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  }

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
        <div className="txnTitle">{`Transactions with {person.name} `}</div>
        <div className="txnHeaderOpts flex items-center gap-4">
          <Input
            isClearable
            classNames={{
              base: "max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by reason..."
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
          //sortDescriptor={list.sortDescriptor} todo
          //onSortChange={list.sort}
          isHeaderSticky
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={txnApi.loading}
            items={filteredTxns}
            emptyContent={
              <div className="emptyTableAnim">
                <Lottie
                  //lottieRef={lottieRef}
                  animationData={emptyTxnsAnim}
                  loop={false}
                  //onComplete={handleAnimationComplete}
                  //className="moneyHandAnim w-1/2"
                />
              </div>
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
