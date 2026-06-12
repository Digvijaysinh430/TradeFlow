import React, { useState } from "react";

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n ?? 0);

function Watchlist({ items = [], stocks = [], onAdd, onRemove }) {
  const [selected, setSelected] = useState("");

  // stocks not already in the watchlist, for the add dropdown
  const watched = new Set(items.map((i) => i.symbol));
  const available = stocks.filter((s) => !watched.has(s.symbol));

  const handleAdd = () => {
    if (selected) {
      onAdd(selected);
      setSelected("");
    }
  };

  return (
    <div className="signup-card watchlist">
      <h2 className="signup-card-title">Watchlist</h2>

      {/* add control */}
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select form-select-sm"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Add a stock...</option>
          {available.map((s) => (
            <option key={s.symbol} value={s.symbol}>
              {s.symbol}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={handleAdd}
          disabled={!selected}
        >
          Add
        </button>
      </div>

      {/* list */}
      {items.length === 0 ? (
        <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
          Your watchlist is empty. Add a stock to track its price.
        </p>
      ) : (
        <ul className="list-unstyled mb-0">
          {items.map((item) => {
            const positive = item.change >= 0;
            const color = positive ? "#16a34a" : "#dc2626";
            return (
              <li
                key={item.symbol}
                className="d-flex justify-content-between align-items-center py-2"
                style={{ borderBottom: "1px solid #f1f1f1" }}
              >
                <div>
                  <div style={{ fontWeight: 600, color }}>{item.symbol}</div>
                  <div style={{ fontSize: "0.75rem", color }}>
                    {positive ? "▲" : "▼"} {Math.abs(item.changePercent)}%
                  </div>
                </div>
                <div className="text-end">
                  <div style={{ fontWeight: 600 }}>
                    {formatINR(item.lastPrice)}
                  </div>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0"
                    style={{
                      fontSize: "0.7rem",
                      color: "#9ca3af",
                      textDecoration: "none",
                    }}
                    onClick={() => onRemove(item.symbol)}
                  >
                    remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;