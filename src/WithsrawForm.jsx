import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [motive, setMotive] = useState("");
  const [category, setCategory] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { accountId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/transactions/withdraw/${accountId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          motive,
          category,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/account/${accountId}`);
        }, 3000);
      } else {
        console.error("Erreur lors de la soumission du formulaire.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Withdraw Form</h2>
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Withdrawing successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="motive" className="form-label">
            Motive
          </label>
          <input
            type="text"
            className="form-control"
            id="motive"
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Shopping and online shops">
              Shopping and online shops
            </option>
            <option value="Accommodation">Accommodation</option>
            <option value="Transport">Transport</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Leisure">Leisure</option>
            <option value="Multimedia, IT">Multimedia, IT</option>
            <option value="Financial expenses">Financial expenses</option>
            <option value="Investments">Investments</option>
            <option value="Income">Income</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WithdrawForm;
