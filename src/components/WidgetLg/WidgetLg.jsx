import { useState, useEffect } from "react";
import main_axios from "../../utilities/mainaxios"; // Assuming you have main_axios set up for API calls
import "./WidgetLg.css";

export default function WidgetLg() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await main_axios.get('/payment/get-paid-orders-list');
                setTransactions(response.data.usersAndOrders);  // Extracting transactions from the response
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        
        fetchTransactions();
    }, []);

    const Button = ({ type }) => {
        return <button className={"btn " + type}>{type}</button>;
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <div className="widgetLgList">
                <table className="widgetLgTable">
                    <thead>
                        <tr>
                            <th className="widgetLgTh">Customer</th>
                            <th className="widgetLgTh">Date</th>
                            <th className="widgetLgTh">Amount</th>
                            <th className="widgetLgTh">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(({ user, order }) => (
                            <tr key={order.id}>
                                <td className="widgetLgTd widgetLgCustomer">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="user"
                                        className="widgetLgImg"
                                    />
                                    <span className="widgetLgTdTitle">{user.name}</span>
                                </td>
                                <td className="widgetLgTd widgetLgTdGray">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="widgetLgTd widgetLgTdGray">
                                    ₹{order.amount}
                                </td>
                                <td className="widgetLgTd">
                                    <Button type={order.status === 'paid' ? 'Approved' : 'Pending'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
