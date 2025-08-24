import React from "react";

const AnalyticsChart = ({ title, data, type = "bar" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-24 text-sm text-gray-600 truncate">{item.label}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
          </div>
          <div className="w-16 text-sm font-medium text-gray-900 text-right">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPieChart = () => (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
          {data.map((item, index) => {
            const percentage = (item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100;
            const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / data.reduce((sum, d) => sum + d.value, 0)) * 360, 0);
            const endAngle = startAngle + (percentage * 360) / 100;
            
            const x1 = 16 + 12 * Math.cos(startAngle * Math.PI / 180);
            const y1 = 16 + 12 * Math.sin(startAngle * Math.PI / 180);
            const x2 = 16 + 12 * Math.cos(endAngle * Math.PI / 180);
            const y2 = 16 + 12 * Math.sin(endAngle * Math.PI / 180);
            
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            return (
              <path
                key={index}
                d={`M 16 16 L ${x1} ${y1} A 12 12 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color || `hsl(${(index * 137.5) % 360}, 70%, 60%)`}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {data.reduce((sum, item) => sum + item.value, 0)}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="relative h-32">
      <svg className="w-full h-full" viewBox={`0 0 ${data.length * 40} 128`}>
        <polyline
          fill="none"
          stroke="rgb(99, 102, 241)"
          strokeWidth="2"
          points={data.map((item, index) => `${index * 40 + 20},${128 - (item.value / maxValue) * 100}`).join(" ")}
        />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={index * 40 + 20}
            cy={128 - (item.value / maxValue) * 100}
            r="3"
            fill="rgb(99, 102, 241)"
          />
        ))}
      </svg>
    </div>
  );

  const renderChart = () => {
    switch (type) {
      case "pie":
        return renderPieChart();
      case "line":
        return renderLineChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {renderChart()}
      
      {type === "pie" && (
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || `hsl(${(index * 137.5) % 360}, 70%, 60%)` }}
              ></div>
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-900 ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
