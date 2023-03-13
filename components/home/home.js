"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import TransactionContext from "@/lib/transactionContext";
import { useUserData } from "@/lib/hooks";
import { fetchWrapper } from "@/helper";
import CardLineChart from "../chart";
import TableElement from "../table/table";

let is_error_displayed = 0;

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (transactionId) => transactionId,
    width: 220,
  },
  {
    title: "Employee Name",
    dataIndex: "employee_name",
    key: "employee_name",
    width: 150,
  },
  {
    title: "Amount (BDT)",
    dataIndex: "amount",
    key: "amount",
    width: 110,
    render: (amount) =>
      Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 120,
  },

  {
    title: "Time",
    key: "time",
    dataIndex: "time",
    width: 120,
  },
];

export default function Dashboard() {
  const router = useRouter();

  const { user, company } = useUserData();
  const [validUser, setValidUser] = useState(false);

  const [firstCall, setFirstCall] = useState(false);
  const [errorTrue, setErrorTrue] = useState(false);

  const [totalEmpLimit, setTotalEmpLimit] = useState("");
  const [empLimit, setEmpLimit] = useState("");
  const [totalcompanylimit, settotalcompanylimit] = useState("0");

  const [companyEmployeesCount, setEmployeesCount] = useState("");
  const [amountPayable, setAmountPayable] = useState("");
  const [averageTransactions, setAverageTransactions] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [transactionsCount, setTransactionsCount] = useState([]);
  const [lastYearTransaction, setLastYearTransactionList] = useState("");
  const transContext = useContext(TransactionContext);

  const [page, setPage] = useState({});
  const [pageLimit, setPageLimit] = useState("10");
  const [pageNuumber, setPageNumber] = useState(1);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    // if no user then redirect to login page
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === ""
    ) {
      router.push("/login");
      return;
    } else if (
      localStorage.getItem("user") === true ||
      localStorage.getItem("user") != null
    )
      setValidUser(true);
    if (user == null || user.roles.role_id == 8) {
      router.push("/login");
    }
    if (company == null) {
      // router.push("/login");
      return;
    }

    // set company id
    const companyId = company.company_id;

    // if this is the first call in the page
    // to prevent continuos calls
    if (firstCall === false) {
      // get company limit
      fetchWrapper
        .get(process.env.BASE_URI + "companies/id/" + companyId)
        .then((res) => {
          if (res?.data) settotalcompanylimit(res.data[0]?.company_limit);
        });
      // get number of employees
      fetchWrapper
        .get(process.env.BASE_URI + "companies/" + companyId + "/employeecount")
        .then((employees) => {
          if (employees !== undefined) {
            setEmployeesCount(employees.data.employees);
          }
        })
        .catch(function (err) {
          setErrorTrue(true);
        });

      // get amount payable to ezwage
      fetchWrapper
        .get(
          process.env.BASE_URI +
            "employees/ezwagedueamount/company_id/" +
            companyId
        )
        .then((payable) => {
          if (payable.ezwageAmount) {
            const py = payable.ezwageAmount;
            setAmountPayable(py.toFixed(0));
          } else {
            setAmountPayable("0");
          }
        })
        .catch(function (err) {
          setErrorTrue(true);
        });

      // get remaining company limit
      fetchWrapper
        .get(
          process.env.BASE_URI +
            "employees/remainingemployeelimit/company_id/" +
            companyId
        )
        .then((limit) => {
          if (limit) {
            setEmpLimit(
              company.company_limit === 0
                ? limit.remainingLimit.toFixed(0)
                : company?.company_limit
            );
          } else {
            setEmpLimit("00");
          }
        })
        .catch(function (err) {
          setErrorTrue(true);
        });

      fetchWrapper
        .get(
          process.env.BASE_URI +
            "employees/remainingemployeelimit/company_id/" +
            companyId
        )
        .then((limit) => {
          if (limit !== undefined) {
            setTotalEmpLimit(company.company_limit);
          } else {
            setTotalEmpLimit("00");
          }
        })
        .catch(function (err) {
          setErrorTrue(true);
        });

      // get average trasnaction
      fetchWrapper
        .get(
          process.env.BASE_URI +
            "transaction/averagetransaction/company_id/" +
            companyId
        )
        .then((avgTransactions) => {
          if (avgTransactions) {
            setAverageTransactions(
              avgTransactions[0]["average"] === null
                ? 0
                : avgTransactions[0]["average"].toFixed(0)
            );
          } else {
            setAverageTransactions("0");
          }
        })
        .catch(function (err) {
          setErrorTrue(true);
        });

      getTransaction(0, pageNuumber);
      getTransactionHistory();
      setFirstCall(true);
    }
  }, [company]);

  // convert in 12hrs
  function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h;
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }

  // pagination
  const nextPage = async () => {
    setPageNumber((pageNuumber) => pageNuumber + 1);
    getTransaction(0, pageNuumber + 1);
  };
  const prevPage = () => {
    setPageNumber((pageNuumber) => pageNuumber - 1);
    getTransaction(0, pageNuumber - 1);
  };

  const changePage = (number) => {
    setPageNumber((pageNuumber) => number);
    getTransaction(0, number);
  };
  const changeLimit = (size) => {
    setPageLimit(size);
    getTransaction(size, 1);
  };

  if (errorTrue && is_error_displayed === 0) {
    is_error_displayed = 1;
    message.error(
      "Session expired. Please try refreshing page. If error remains please contact with support team or Email us this error."
    );
  }

  // get transaction of last 12 months
  const getTransactionHistory = () => {
    fetchWrapper
      .get(
        `${process.env.BASE_URI}transaction/getLastYearTransactions/company_id/${user.companyId}`
      )
      .then((historyData) => {
        setHistory(historyData);
      })
      .catch(function (err) {
        // setErrorTrue(true);
      });
  };

  // get transaction data
  const getTransaction = (size = 0, number) => {
    let count = 0;
    let sizing = 0;
    if (size === 0) sizing = pageLimit;
    else sizing = size;

    fetchWrapper
      .get(
        `${process.env.BASE_URI}companies/${user.company_id}/transactions?limit=${sizing}&pageNumber=${number}`
      )
      .then((transactions) => {
        if (transactions !== undefined) {
          setPage(transactions.pager);

          // get number of transactions
          fetchWrapper
            .get(
              `${process.env.BASE_URI}companies/${user.company_id}/transactionCount?status=Sent`
            )
            .then((transCount) => {
              setTransactionsCount(transCount.transactions);
            });
          if (transactions) {
            if (transactions !== undefined) {
              let counter = 1;
              let transactionList = [];
              transactions.data.forEach((doc) => {
                if (doc["status"] !== "Failed") count++;

                let year = doc["transaction_time"].substring(0, 4);
                let month = doc["transaction_time"].substring(5, 7);
                let day = doc["transaction_time"].substring(8, 10);
                let settime = doc["transaction_time"].substring(11, 19);

                const options = {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                };
                const transaction = {
                  id: counter,
                  employee_name: doc.employee_name,
                  transactionId:
                    doc.stan === "" || doc.stan === null ? doc._id : doc.stan,
                  accountId:
                    doc["employee_id"] == "undefined"
                      ? "Old data without employeeId"
                      : doc["employee_id"],
                  amount: doc["amount"],
                  date: day + "/" + month + "/" + year,
                  time: tConv24(settime),
                };

                transactionList.push(transaction);
                counter++;
              });

              transContext.addAllTransaction(transactionList);
              setTransactions(transactionList);
            }
          } else {
            setPageLimit(1);
            setPageNumber(1);
            setPage({ totaPages: 1 });
          }
        }
      })
      .catch(function (err) {
        setErrorTrue(true);
      });
  };

  return (
    <>
      {/* if there is a valid user logged in */}
      {validUser === true ? (
        <div>
          <p className="text-gray-700 text-3xl mb-16 font-bold pt-[80px]">
            Dashboard
          </p>

          {/* cards to display overall data */}
          <div className="grid lg:grid-cols-3 gap-5 mb-16">
            <div className="rounded-xl bg-[#3A7FC1] h-[130px] shadow-sm flex flex-col">
              <div className="px-4 py-5">
                <div className="text-[26px] font-bold text-white">
                  {/* {!firstCall && <Loader show={true} />} */}
                  BDT {firstCall && totalcompanylimit}
                </div>
                <div className="text-[14px] text-white">
                  Total Company Limit
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-[#3A7FC1] h-[130px]  shadow-sm flex flex-col">
              <div className="px-4 py-5">
                <div className="text-[26px] font-bold text-white">
                  {/* {!firstCall && <Loader show={true} />} */}
                  BDT {firstCall && averageTransactions}
                </div>
                <div className="text-[14px] text-white">
                  Average Transactions
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-[#3A7FC1] h-[130px]  shadow-sm flex flex-col">
              <div className="px-4 py-5">
                <div className="text-[26px] font-bold text-white">
                  {/* {!firstCall && <Loader show={true} />} */}
                  {firstCall && companyEmployeesCount}
                </div>
                <div className="text-[14px] text-white">No. of Employees</div>
              </div>
            </div>
            <div className="rounded-xl bg-[#3A7FC1] h-[130px]  shadow-sm flex flex-col">
              <div className="px-4 py-5">
                <div className="text-[26px] font-bold text-white">
                  {/* {!firstCall && <Loader show={true} />} */}
                  BDT{" "}
                  {firstCall
                    ? company === null
                      ? 0
                      : company.company_limit === 0
                      ? empLimit
                      : company.company_limit - amountPayable
                    : 0}
                </div>
                <div className="text-[14px] text-white">
                  Remaining Company Limit
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-[#3A7FC1] h-[130px]  shadow-sm flex flex-col">
              <div className="px-4 py-5">
                <div className="text-[26px] font-bold text-white">
                  {/* {!firstCall && <Loader show={true} />} */}
                  BDT {firstCall && amountPayable}
                </div>
                <div className="text-[14px] text-white">
                  Amount Payable to EZ Wage
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-[#3A7FC1] h-[130px]  shadow-sm flex flex-col">
              <div className="px-4 py-5">
                <div className="text-[26px] font-bold text-white">
                  {/* {!firstCall && <Loader show={true} />} */}
                  {firstCall && transactionsCount}
                </div>
                <div className="text-[14px] text-white">
                  No. of Transactions
                </div>
              </div>
            </div>
          </div>
          {/* end of cards to display overall data */}

          {/* the data chart */}
          <div>
            <CardLineChart data={history} />
          </div>
          {/* end of the data chart */}

          {/* table component */}
          <p className="text-gray-700 text-xl my-10 font-bold">
            Recent Transactions
          </p>
          <div>
            <TableElement
              id="id"
              columns={columns}
              data={transactions}
              page={page}
              pageNumber={pageNuumber}
              prevPage={prevPage}
              changeLimit={changeLimit}
              changePage={changePage}
              pagination={true}
              pageLimit={pageLimit}
              nextPage={nextPage}
              width={900}
            />
          </div>

          {/* end of table */}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
