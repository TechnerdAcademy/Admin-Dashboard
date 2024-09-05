import { DeleteOutline, EditNote } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Paper, Button, Typography } from "@mui/material";
import "./TransactionList.css"; // Ensure this file exists and includes necessary styles

export default function TransactionList() {
    const [transactions, setTransactions] = useState([
        { id: 1, user: "John Doe", date: "2024-08-30", amount: 500, status: "Approved" },
        { id: 2, user: "Jane Doe", date: "2024-08-29", amount: 1000, status: "Pending" },
        { id: 3, user: "Bob Smith", date: "2024-08-28", amount: 2000, status: "Rejected" },
        { id: 4, user: "Alice Johnson", date: "2024-08-27", amount: 3000, status: "Approved" },
        { id: 5, user: "Mike Brown", date: "2024-08-26", amount: 4000, status: "Approved" },
    ]);

    const handleTransactionDelete = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "user", headerName: "User", width: 200 },
        { field: "date", headerName: "Date", width: 150 },
        { field: "amount", headerName: "Amount", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        { 
            field: "actions", 
            headerName: "Actions", 
            width: 130, 
            renderCell: (params) => {
                return (
                    <div className="transactionTableAction">
                        {/* <Link to={"transaction/edit/" + params.row.id}>
                            <EditNote className="transactionListIcon edit" />
                        </Link> */}
                        <DeleteOutline className="transactionListIcon delete" onClick={() => handleTransactionDelete(params.row.id)} />
                    </div>
                );
            }
        },
    ];

    return (
        <div className="transactionList">
            <Paper elevation={3} className="transactionListPaper">
                <div className="transactionListTop">
                    <Typography variant="h6" className="transactionListTitle">Transaction List</Typography>
                    {/* Uncomment if you have a create transaction feature */}
                    {/* <Link to="/newTransaction">
                        <Button variant="contained" color="primary" className="transactionListCreateBtn">Create</Button>
                    </Link> */}
                </div>
                <div className="transactionListContent">
                    <DataGrid
                        rows={transactions}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        autoHeight
                    />
                </div>
            </Paper>
        </div>
    );
}
