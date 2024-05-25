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
    // replace this with your solution from Assignment 1!
    return "February";
  };

  /** Returns the number of days in the month for a given zero-based month index and year.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @param year {number} a 4-digit year
   * @returns {number} the number of days in the given month and year
   */
  this.getDaysInMonth = function (monthIndex, year) {
    // replace this with your solution from Assignment 1!
    return 28;
  };

  // method display generates calendar HTML
  // the displayDate parameter indicates the year and month to render (display)
  this.display = function (displayDate = new Date()) {
    // clear the calendar element
    this.elem.innerHTML = "";

    // get the number of days in the month
    let daysInMonth = this.getDaysInMonth(
      displayDate.getMonth(),
      displayDate.getFullYear()
    );

    // get array of days to display
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), i));
    }

    let iHTML = "";

    // generate tabular calendar
    iHTML += "<table>";
    iHTML += "<thead>";

    // a row containing the previous month button, month name and year, and next month button
    // the previous and next month buttons call the cal.display() method when clicked
    // with parameters of year displayed, but previous or next month
    // dates will "carry forward", increasing or decreasing the year automatically
    iHTML += "<tr>";
    iHTML += "<td>";
    iHTML +=
      '<button \
                  value="Previous Month" \
                  onclick="cal.display(new Date(' +
      displayDate.getFullYear() +
      "," +
      (displayDate.getMonth() - 1) +
      '));">';
    iHTML += "&lt;&lt;";
    iHTML += "</button>";
    iHTML += "</td>";
    iHTML += '<td colspan="5">';
    iHTML += "<h1>";
    iHTML +=
      this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear();
    iHTML += "</h1>";
    iHTML += "</td>";
    iHTML += "<td>";
    iHTML +=
      '<button \
                  value="Next Month" \
                  onclick="cal.display(new Date(' +
      displayDate.getFullYear() +
      "," +
      (displayDate.getMonth() + 1) +
      '));">';
    iHTML += "&gt;&gt;";
    iHTML += "</button>";
    iHTML += "</td>";
    iHTML += "</tr>";

    // row of weekday name headers
    // loop through the array, creating a table header cell for each element in the array
    iHTML += "<tr>";
    for (const elem of this.dayNames) {
      iHTML += "<th>";
      iHTML += elem;
      iHTML += "</th>";
    }
    iHTML += "</tr>";

    // end the table head section, and start the table body section
    iHTML += "</thead>";
    iHTML += "<tbody>";

    // calendar table body rows (days of the month)
    // start with blank cells until 1st of month
    iHTML += "<tr>";

    // loop from 0 until the first day of the month (Sunday, until the day of the week of the first day of the month)
    // create an empty table cell for each blank day
    for (let i = 0; i < days[0].getDay(); i++) {
      iHTML += "<td></td>";
    }

    // for each day within the month, create a table cell containing the date
    for (let i = 0; i < days.length; i++) {
      // if this day is a Sunday, end the previous week table row, and start a new row
      if (days[i].getDay() == 0) {
        iHTML += "</tr>";
        iHTML += "<tr>";
      }

      // create a table cell with the CSS class "day", and the text value of the day of the month
      iHTML += '<td class="day">';
      iHTML += days[i].getDate();
      iHTML += "</td>";
    }
    // last week of month empty cells to fill the week
    // create an empty table cell for each blank day
    for (let i = days.at(-1).getDay() + 1; i < 7; i++) {
      iHTML += "<td></td>";
    }
    iHTML += "</tr>";

    // end the table body section and calendar table
    iHTML += "</tbody>";
    iHTML += "</table>";

    // output the calendar to the HTML element
    this.elem.innerHTML += iHTML;
  };
}

// declare a instance of Calendar
const cal = new Calendar(document.getElementById("calendar"));

// call the display() method
cal.display();
