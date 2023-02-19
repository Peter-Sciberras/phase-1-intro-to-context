// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(emp, dateStr) {
    const [date, hour] = dateStr.split(" ");
    emp.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return emp;
  }
  
  function createTimeOutEvent(emp, dateStr) {
    const [date, hour] = dateStr.split(" ");
    emp.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return emp;
  }
  
  function hoursWorkedOnDate(emp, date) {
    const timeIn = emp.timeInEvents.find(event => event.date === date);
    const timeOut = emp.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(emp, date) {
    const hours = hoursWorkedOnDate(emp, date);
    return hours * emp.payPerHour;
  }
  
  function allWagesFor(emp) {
    const dates = emp.timeInEvents.map(event => event.date);
    const wages = dates.map(date => wagesEarnedOnDate(emp, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  function calculatePayroll(emps) {
    const wages = emps.map(emp => allWagesFor(emp));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  // Sample test data provided by Ultron data systems
  const employees = createEmployeeRecords([
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]);
  
  createTimeInEvent(employees[0], "2022-01-01 0900");
  createTimeOutEvent(employees[0], "2022-01-01 1100");
  createTimeInEvent(employees[1], "2022-01-01 0900");
  createTimeOutEvent(employees[1], "2022-01-01 1100");
  createTimeInEvent(employees[1], "2022-01-02 0900");
  createTimeOutEvent(employees[1], "2022-01-02 1700");
  
  console.log(calculatePayroll(employees)); // 11880
  