import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://iot-project-yyy2.azurewebsites.net/get_temp")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 错误: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API返回数据:", data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("获取数据出错:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const prepareChartData = () => {
    if (!data || data.length === 0) return [["Time", "Temperature"]];

    const firstItem = data[0];
    let tempField = "temp";
    if (firstItem.value !== undefined) tempField = "value";
    if (firstItem.temperature !== undefined) tempField = "temperature";

    // 计算 10 分钟前的时间戳
    const now = new Date();
    const TEN_MINUTES = 10 * 60 * 1000;
    const tenMinutesAgo = now.getTime() - TEN_MINUTES;

    const recentData = data.filter((item) => {
      if (!item.timestamp) return false;
      const timestamp = new Date(item.timestamp).getTime();
      return timestamp >= tenMinutesAgo;
    });

    return [
      ["Time", "Temperature"],
      ...recentData.map((item) => {
        const timeString = item.timestamp
          ? item.timestamp.split("+")[0].split("T")[1].split(".")[0]
          : "未知时间";

        const tempValue = parseFloat(item[tempField]) || 0;

        return [timeString, tempValue];
      }),
    ];
  };

  const chartData = prepareChartData();

  const options = {
    title: "Temperature Over Time (Last 10 Minutes)",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "Time",
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: {
      title: "Temperature (°C)",
    },
    explorer: {
      actions: ["dragToZoom", "rightClickToReset"],
      axis: "horizontal",
      keepInBounds: true,
      maxZoomIn: 4.0,
    },
  };

  return (
    <>
      <Header />
      <main
        className="container"
        style={{ padding: "20px", textAlign: "center" }}
      >
        {loading && <p>加载中...</p>}
        {error && <p style={{ color: "red" }}>错误: {error}</p>}

        {!loading && !error && data && data.length > 0 ? (
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={chartData}
            options={options}
          />
        ) : !loading && !error ? (
          <p>没有可用的温度数据</p>
        ) : null}

        {/* 可选调试信息 */}
        {!loading && !error && data && (
          <div
            style={{ marginTop: "30px", textAlign: "left", display: "none" }}
          >
            <h3>原始数据:</h3>
            <pre>{JSON.stringify(data.slice(-5), null, 2)}</pre>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
