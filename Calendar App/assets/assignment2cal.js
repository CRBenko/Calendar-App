// declare an object Calendar
function Calendar(elem) {
  // HTML element in which to display the calendar
  this.elem = elem;

  // array containing list of names of the days of the week
  this.dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  /** Returns the month name of the year for a given month index.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @returns {string} the name of the given month
   */
  this.getMonth = function (monthIndex) {
    switch (monthIndex) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "Unknown"; //Returns if input was invalid
    }
  };

  /** Returns the number of days in the month for a given zero-based month index and year.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @param year {number} a 4-digit year
   * @returns {number} the number of days in the given month and year
   */
  this.getDaysInMonth = function (monthIndex, year) {
    month = monthIndex + 1;
    if (monthIndex < 0 || isNaN(monthIndex)) {
      return "-1";
    } else if (monthIndex > 11 || isNaN(monthIndex)) {
      return "-1";
    } else if (isNaN(year)) {
      return "-1";
    } else {
      return new Date(year, month, 0).getDate();
    }
  };

  // method display generates calendar HTML
  // the displayDate parameter indicates the year and month to render (display)
  this.display = function (displayDate = new Date()) {
    // clear the calendar element
    this.elem.innerHTML = "";

    let daysInMonth = this.getDaysInMonth(
      displayDate.getMonth(),
      displayDate.getFullYear()
    );

    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), i));
    }
    //
    // generate tabular calendar
    //
    //  Table Header  //
    //
    var table = document.createElement("table");
    calendar.append(table);
    var thead = document.createElement("thead");
    table.append(thead);
    var tr = document.createElement("tr");
    thead.append(tr);
    //
    //  TR 1 / TD 1
    //
    var td = document.createElement("td");
    tr.append(td);
    var prevBtn = document.createElement("button");
    td.append(prevBtn);
    prevBtn.setAttribute("value", "Previous Month");
    textNode = document.createTextNode("<<");
    prevBtn.appendChild(textNode);
    prevBtn.addEventListener("click", function () {
      cal.display(
        new Date(displayDate.getFullYear(), displayDate.getMonth() - 1)
      );
    });
    //
    //  TD 2
    //
    td = document.createElement("td");
    tr.append(td);
    td.setAttribute("colspan", "5");
    var h1 = document.createElement("h1");
    td.append(h1);
    var textNode = document.createTextNode(
      this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear()
    );
    h1.appendChild(textNode);
    //
    //  TD 3
    //
    td = document.createElement("td");
    tr.append(td);
    var nextBtn = document.createElement("button");
    td.append(nextBtn);
    nextBtn.setAttribute("value", "Next Month");
    textNode = document.createTextNode(">>");
    nextBtn.appendChild(textNode);
    nextBtn.addEventListener("click", function () {
      cal.display(
        new Date(displayDate.getFullYear(), displayDate.getMonth() + 1)
      );
    });
    //
    //  TR 2 / TH 0-6 (days of week)
    //
    //
    // row of weekday name headers
    // loop through the array, creating a table header cell for each element in the array
    tr = document.createElement("tr");
    thead.append(tr);
    for (const elem of this.dayNames) {
      let th = document.createElement("th");
      tr.append(th);
      th.textContent = elem;
      if (elem == "Sunday" || elem == "Saturday") {
        th.classList.add("weekend");
      }
    }

    //
    //
    //  Table Body  //
    //
    //
    var tbody = document.createElement("tbody");
    table.append(tbody);
    tr = document.createElement("tr");
    tbody.append(tr);
    // loop from 0 until the first day of the month (Sunday, until the day of the week of the first day of the month)
    // create an empty table cell for each blank day
    for (let i = 0; i < days[0].getDay(); i++) {
      td = document.createElement("td");
      tr.append(td);
      td.textContent = "";
    }
    // for each day within the month, create a table cell containing the date
    for (let i = 0; i < days.length; i++) {
      // if this day is a Sunday, end the previous week table row, and start a new row
      if (days[i].getDay() == 0) {
        tr = document.createElement("tr");
        tbody.append(tr);
      }
      // create a table cell with the CSS class "day", and the text value of the day of the month
      td = document.createElement("td");
      tr.append(td);
      td.classList.add("day");
      td.textContent = days[i].getDate();

      let today = new Date().getDate();
      let month = new Date().getMonth();
      let year = new Date().getFullYear();
      if (
        days[i].getDate() === today &&
        displayDate.getMonth() === month &&
        displayDate.getFullYear() === year
      ) {
        td.classList.add("today");
      }
    }

    // last week of month empty cells to fill the week
    // create an empty table cell for each blank day
    for (let i = days.at(-1).getDay() + 1; i < 7; i++) {
      td = document.createElement("td");
      tr.append(td);
    }

    // output the calendar to the HTML element
    this.elem.append("");
  };
}

// declare an instance of Calendar
const cal = new Calendar(document.getElementById("calendar"));

// call the display() method
cal.display();

// //
// //  TR 2 / TH 0-6 (days of week) FIRST ATTEMPT
// //
// tr = document.createElement("tr");
// thead.append(tr);
// var th = document.createElement("th");
// tr.append(th);
// th.textContent = "Sunday";
// th = document.createElement("th");
// tr.append(th);
// th.textContent = "Monday";
// th = document.createElement("th");
// tr.append(th);
// th.textContent = "Tuesday";
// th = document.createElement("th");
// tr.append(th);
// th.textContent = "Wednesday";
// th = document.createElement("th");
// tr.append(th);
// th.textContent = "Thursday";
// th = document.createElement("th");
// tr.append(th);
// th.textContent = "Friday";
// th = document.createElement("th");
// tr.append(th);
// th.textContent = "Saturday";

//
//
//  First Attempt Table Body
//
//
// var tbody = document.createElement("tbody");
// table.append(tbody);
// //
// //  TR 1
// //
// tr = document.createElement("tr");
// tbody.append(tr);
// // for (let i = 0; i < days[0].getDay(); i++) {
// //   td = document.createElement("td");
// //   tr.append(td);
// //   td.textContent = i;
// // }
// td = document.createElement("td");
// tr.append(td);
// td = document.createElement("td");
// tr.append(td);
// td = document.createElement("td");
// tr.append(td);
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "1";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "2";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "3";
// td = document.createElement("td");
// tr.append(td);
// //
// //  TR 2
// //
// tr = document.createElement("tr");
// tbody.append(tr);
// // for (let i = 0; i < days[0].getDay(); i++) {
// //   td = document.createElement("td");
// //   tr.append(td);
// //   td.textContent = i;
// // }
// td.setAttribute("class", "day");
// td.textContent = "4";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "5";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "6";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "7";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "8";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "9";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "10";
// td = document.createElement("td");
// tr.append(td);
// //
// //  TR 3
// //
// tr = document.createElement("tr");
// tbody.append(tr);
// // for (let i = 0; i < days[0].getDay(); i++) {
// //   td = document.createElement("td");
// //   tr.append(td);
// //   td.textContent = i;
// // }
// td.setAttribute("class", "day");
// td.textContent = "11";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "12";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "13";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "14";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "15";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "16";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "17";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "18";
// //
// //  TR 4
// //
// tr = document.createElement("tr");
// tbody.append(tr);
// // for (let i = 0; i < days[0].getDay(); i++) {
// //   td = document.createElement("td");
// //   tr.append(td);
// //   td.textContent = i;
// // }
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "19";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "20";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "21";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "22";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "23";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "24";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "25";
// //
// //  TR 5
// //
// tr = document.createElement("tr");
// tbody.append(tr);
// for (let i = 0; i < days[0].getDay(); i++) {
// //   td = document.createElement("td");
// //   tr.append(td);
// //   td.textContent = i;
// // }
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "26";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "27";
// td = document.createElement("td");
// tr.append(td);
// td.setAttribute("class", "day");
// td.textContent = "28";
// td = document.createElement("td");
// tr.append(td);
// td = document.createElement("td");
// tr.append(td);
// td = document.createElement("td");
// tr.append(td);
// td = document.createElement("td");
// tr.append(td);
