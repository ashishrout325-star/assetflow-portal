import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard({ user, onLogout }) {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    status: "Available",
    value: "",
    serialNumber: "",
    assignedTo: "",
  });

  const fetchAssets = async () => {
    try {
      const res = await API.get("/assets");
      setAssets(res.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/assets", {
        ...form,
        value: Number(form.value),
      });

      setForm({
        name: "",
        category: "",
        location: "",
        status: "Available",
        value: "",
        serialNumber: "",
        assignedTo: "",
      });

      fetchAssets();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add asset");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/assets/${id}`);
      fetchAssets();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete asset");
    }
  };

  const totalValue = assets.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">AssetFlow</div>

        <nav>
          <span className="nav-item active">Overview</span>
          <span className="nav-item">Assets</span>
          <span className="nav-item">Reports</span>
          <span className="nav-item">Settings</span>
        </nav>

        <div className="user-box">
          <p>{user.name}</p>
          <small>{user.email}</small>
          <button onClick={onLogout}>Logout</button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <h2>Asset Dashboard</h2>
          <div className="stats-chip">{assets.length} assets</div>
        </header>

        <section className="summary-grid">
          <div className="summary-card accent">
            <span>Total Assets</span>
            <strong>{assets.length}</strong>
          </div>

          <div className="summary-card">
            <span>In Use</span>
            <strong>{assets.filter((asset) => asset.status === "In Use").length}</strong>
          </div>

          <div className="summary-card">
            <span>Maintenance</span>
            <strong>{assets.filter((asset) => asset.status === "Maintenance").length}</strong>
          </div>

          <div className="summary-card">
            <span>Value</span>
            <strong>${totalValue.toLocaleString()}</strong>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h3>Add New Asset</h3>
            <form onSubmit={handleSubmit} className="asset-form">
              <input
                name="name"
                placeholder="Asset name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Available</option>
                <option>In Use</option>
                <option>Maintenance</option>
                <option>Retired</option>
              </select>
              <input
                name="value"
                type="number"
                placeholder="Value"
                value={form.value}
                onChange={handleChange}
              />
              <input
                name="serialNumber"
                placeholder="Serial Number"
                value={form.serialNumber}
                onChange={handleChange}
              />
              <input
                name="assignedTo"
                placeholder="Assigned To"
                value={form.assignedTo}
                onChange={handleChange}
              />

              <button type="submit">Save Asset</button>
            </form>
          </div>

          <div className="panel">
            <h3>Asset List</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset._id}>
                      <td>{asset.name}</td>
                      <td>
                        <span
                          className={`status ${asset.status
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td>{asset.location}</td>
                      <td>${Number(asset.value).toLocaleString()}</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDelete(asset._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
