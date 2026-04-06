import { useCallback, useEffect, useState } from "react";
import API, { getRecords } from "../services/api";
import RecordList from "../components/RecordList";
import RecordModal from "../components/RecordModal";
import { getCategoryLabel } from "../constants/recordCategories";
import AddRecord from "../components/AddRecord";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    fetchRecords();
  }, [refresh]);

  const handleClose = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const fetchRecords = async () => {
    try {
      const res = await getRecords();
      setRecords(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setRecords([]);
    }
  };

  const isViewer = user?.role === "VIEWER";
  const isAnalyst = user?.role === "ANALYST";
  const isAdmin = user?.role === "ADMIN";

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const me = await API.get("/auth/me");
      setUser(me.data.user);
      localStorage.setItem("user", JSON.stringify(me.data.user));

      const summaryRes = await API.get("/dashboard/summary");
      setSummary(summaryRes.data);

      if (me.data.user.role === "ANALYST" || me.data.user.role === "ADMIN") {
        const insightsRes = await API.get("/dashboard");
        setInsights(insightsRes.data);
      } else {
        setInsights(null);
      }
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Chart.js rendering
  useEffect(() => {
    if (!insights) return;

    const existingScript = document.getElementById("chartjs-script");
    if (existingScript) {
      renderCharts();
      return;
    }

    const script = document.createElement("script");
    script.id = "chartjs-script";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.onload = renderCharts;
    document.body.appendChild(script);

    return () => {
      if (window.Chart) {
        const p = window.Chart.getChart("pieChart");
        const b = window.Chart.getChart("barChart");
        if (p) p.destroy();
        if (b) b.destroy();
      }
    };
  }, [insights]);

  function renderCharts() {
    const Chart = window.Chart;
    if (!Chart) return;

    const existingPie = Chart.getChart("pieChart");
    const existingBar = Chart.getChart("barChart");
    if (existingPie) existingPie.destroy();
    if (existingBar) existingBar.destroy();

    const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

    // PIE / DOUGHNUT CHART
    const pieCtx = document.getElementById("pieChart");
    if (pieCtx && insights?.categoryBreakdown?.length) {
      new Chart(pieCtx, {
        type: "doughnut",
        data: {
          labels: insights.categoryBreakdown.map((i) => i.category),
          datasets: [
            {
              data: insights.categoryBreakdown.map((i) => i.total),
              backgroundColor: COLORS,
              borderWidth: 0,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "68%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 16,
                boxWidth: 10,
                boxHeight: 10,
                borderRadius: 2,
                font: { size: 12 },
                color: "#6b7280",
              },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => `  ₹${ctx.parsed.toLocaleString()}`,
              },
            },
          },
        },
      });
    }

    // BAR CHART
    const barCtx = document.getElementById("barChart");
    if (barCtx && insights?.monthlyTrend?.length) {
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: insights.monthlyTrend.map((i) => i.month),
          datasets: [
            {
              label: "Income",
              data: insights.monthlyTrend.map((i) => i.income),
              backgroundColor: "#22c55e",
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.55,
            },
            {
              label: "Expense",
              data: insights.monthlyTrend.map((i) => i.expense),
              backgroundColor: "#f87171",
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.55,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 16,
                boxWidth: 10,
                boxHeight: 10,
                font: { size: 12 },
                color: "#6b7280",
              },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => `  ₹${ctx.parsed.y.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: "#9ca3af", font: { size: 11 } },
            },
            y: {
              grid: { color: "#f3f4f6", lineWidth: 1 },
              border: { display: false, dash: [4, 4] },
              ticks: {
                color: "#9ca3af",
                font: { size: 11 },
                callback: (v) => `₹${v.toLocaleString()}`,
              },
            },
          },
        },
      });
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {getGreeting()}, {user?.name || "User"}
            </p>

            {/* ROLE BADGE */}
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                ${isAdmin
                  ? "bg-purple-100 text-purple-700"
                  : isAnalyst
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {user?.role || "VIEWER"}
            </span>
          </div>

          <p className="text-gray-500 mt-1">
            Here's your financial overview
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm">Total Income</h2>
            <p className="text-green-500 text-3xl font-bold mt-2">
              ₹ {summary?.totalIncome || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm">Total Expenses</h2>
            <p className="text-red-500 text-3xl font-bold mt-2">
              ₹ {summary?.totalExpenses || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm">Net Balance</h2>
            <p className="text-blue-500 text-3xl font-bold mt-2">
              ₹ {summary?.netBalance || 0}
            </p>
          </div>
        </div>
      )}

      {/* CHARTS */}
      {(isAnalyst || isAdmin) && insights && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* DOUGHNUT CHART */}
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-gray-700">Expense Breakdown</h2>
            <p className="text-xs text-gray-400 mb-4">By category</p>
            <div style={{ position: "relative", width: "100%", height: "280px" }}>
              <canvas id="pieChart"></canvas>
            </div>
          </div>

          {/* BAR CHART */}
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-gray-700">Monthly Trends</h2>
            <p className="text-xs text-gray-400 mb-4">Income vs expenses</p>
            <div style={{ position: "relative", width: "100%", height: "280px" }}>
              <canvas id="barChart"></canvas>
            </div>
          </div>

        </div>
      )}

      {/* INSIGHTS */}
      {(isAnalyst || isAdmin) && (
        <div className="grid md:grid-cols-2 gap-5">

          {/* CATEGORY BREAKDOWN */}
          <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
            <div className="space-y-3">
              {(insights?.categoryBreakdown || []).map((item) => (
                <div
                  key={item.category}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600">
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className="font-semibold text-indigo-600">
                    ₹ {item.total}
                  </span>
                </div>
              ))}
              {(insights?.categoryBreakdown || []).length === 0 && (
                <p className="text-sm text-gray-400">No data yet</p>
              )}
            </div>
          </div>

          {/* MONTHLY TREND */}
          <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
            <div className="space-y-3">
              {(insights?.monthlyTrend || []).map((item) => (
                <div
                  key={item.month}
                  className="grid grid-cols-3 text-sm items-center"
                >
                  <span className="text-gray-600">{item.month}</span>
                  <span className="text-green-600 font-medium">
                    ₹ {item.income}
                  </span>
                  <span className="text-red-600 font-medium">
                    ₹ {item.expense}
                  </span>
                </div>
              ))}
              {(insights?.monthlyTrend || []).length === 0 && (
                <p className="text-sm text-gray-400">No data yet</p>
              )}
            </div>
          </div>

        </div>
      )}

      {/* RECORDS */}
      {(isAnalyst || isAdmin) && (
        <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4">Records</h2>
          <RecordList
            refresh={() => setRefresh((prev) => !prev)}
            canManage={false}
          />
        </div>
      )}

      {/* VIEWER MESSAGE */}
      {isViewer && (
        <div className="bg-white rounded-2xl shadow p-5 text-gray-600 border-l-4 border-indigo-500">
          You have viewer access. Detailed records and analytics are restricted.
        </div>
      )}

      {/* MODAL — Admin only, accessible from elsewhere if needed */}
      {isAdmin && (
        <RecordModal isOpen={isModalOpen} onClose={handleClose}>
          <AddRecord
            key={editData ? editData.id : isModalOpen}
            editData={editData}
            onClose={handleClose}
            refresh={() => setRefresh((prev) => !prev)}
          />
        </RecordModal>
      )}

    </div>
  );
}

export default Dashboard;