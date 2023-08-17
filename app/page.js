"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [biWeeklySalary, setBiWeeklySalary] = useState(0);
  const [workdaysInMonth, setWorkdaysInMonth] = useState(0);
  const [daysAbsent, setDaysAbsent] = useState(0);
  const [adjustedPay, setAdjustedPay] = useState(0);
  const [paypalFee, setPaypalFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [dailySalary, setDailySalary] = useState(0);

  const calculateWeekdaysInMonth = (year, month) => {
    const lastDay = new Date(year, month + 1, 0).getDate();
    let weekdays = 0;

    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        weekdays++;
      }
    }

    return weekdays;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateAdjustedPay = () => {
    if (workdaysInMonth <= 0 || daysAbsent < 0) {
      return 0;
    }

    const dailyPayRate = monthlySalary / workdaysInMonth;
    const deduction = dailyPayRate * daysAbsent;
    const adjustedBiWeeklyPay = biWeeklySalary - deduction;
    return adjustedBiWeeklyPay.toFixed(2);
  };

  const handleMonthlySalaryChange = (value) => {
    setMonthlySalary(value);
  };

  const handleDaysAbsentChange = (value) => {
    setDaysAbsent(value);
  };

  useEffect(() => {
    const calculatedAdjustedPay = calculateAdjustedPay();
    const calculatedPaypalFee = (calculatedAdjustedPay * 0.045).toFixed(2);
    const calculatedTotal = (parseFloat(calculatedAdjustedPay) + parseFloat(calculatedPaypalFee)).toFixed(2);

    setAdjustedPay(calculatedAdjustedPay);
    setPaypalFee(calculatedPaypalFee);
    setTotal(calculatedTotal);
  }, [monthlySalary, biWeeklySalary, workdaysInMonth, daysAbsent, calculateAdjustedPay]);

  useEffect(() => {
    setWorkdaysInMonth(calculateWeekdaysInMonth(new Date().getFullYear(), new Date().getMonth()));
    setBiWeeklySalary((monthlySalary / 2).toFixed(2));
    setDailySalary((monthlySalary / (workdaysInMonth * 2)).toFixed(2));
  }, [monthlySalary, workdaysInMonth]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-gray-500 text-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium">Monthly Salary:</label>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => handleMonthlySalaryChange(parseFloat(e.target.value))}
            className="w-full mt-1 p-2 rounded border-gray-300 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Days Absent:</label>
          <input
            type="number"
            value={daysAbsent}
            onChange={(e) => handleDaysAbsentChange(parseFloat(e.target.value))}
            className="w-full mt-1 p-2 rounded border-gray-300 text-black"
          />
        </div>
        <p className="text-md mb-2">Unadjusted Bi-Weekly Salary: <strong>${biWeeklySalary}</strong></p>
        <p className="text-md mb-2">Adjusted Bi-Weekly Pay: <strong>${adjustedPay}</strong></p>
        <p className="text-md mb-2">PayPal Fee (4.5%): <strong>${paypalFee}</strong></p>
        <p className="text-md mb-2">Salary per Day (40hrs/week): <strong>${dailySalary}</strong></p>
        <p className="text-md mb-2">Days in Month: <strong>{workdaysInMonth}</strong></p>
        <p className="text-md mb-2">Total: <strong>${total}</strong></p>
      </div>
    </div>
  );
}
