/*
 * Student Name: Curtis Benko
 * Student ID: 41104274
 * Course: CST8209 - Web Programming I
 * Semester: 23W
 * Assignment: 4
 * Date Submitted: APRIL 2023
 */

//
//
// Calendar
//
//

//JQUERY ready
$(function () {
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
        days.push(
          new Date(displayDate.getFullYear(), displayDate.getMonth(), i)
        );
      }
      //
      // generate tabular calendar
      //
      //  Table Header  //
      //
      var table = $("<table>");
      $(calendar).append(table);
      var thead = $("<thead>");
      $(table).append(thead);
      var tr = $("<tr>");
      $(thead).append(tr);
      //
      //  TR 1 / TD 1
      //
      var td = $("<td>");
      $(tr).append(td);
      var prevBtn = $("<button>");
      $(td).append(prevBtn);
      $(prevBtn)
        .val("Previous Month")
        .addClass("previous-btn")
        .attr("title", "back to previous month")
        .attr("data-placement", "left")
        .attr("data-toggle", "tooltip")
        .append("<<")
        .click(function () {
          cal.display(
            new Date(displayDate.getFullYear(), displayDate.getMonth() - 1)
          );
        });
      //
      //  TD 2
      //
      td = $("<td>");
      $(tr).append(td);
      var h1 = $("<h1>");
      $(td).attr("colspan", "5").append(h1);
      $(h1).append(
        this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear()
      );

      //
      //
      //  ANALOG CLOCK
      //
      //

      clock = $("<div>");
      $(td).append(clock);
      $(clock).addClass("clock");
      time = $("<div>");
      $(clock).append(time);
      $(time).addClass("time");

      // Cited and Adapted from Dev A.T Viet Nam on Youtube, Sept. 28, 2022
      function renderClock() {
        const dayTime = d.toLocaleTimeString();
        $(time).text(dayTime);
      }

      function init() {
        d = new Date();
        renderClock();

        setTimeout(init, 1000);
      }

      init();

      //
      //  TD 3
      //
      td = $("<td>");
      $(tr).append(td);
      var nextBtn = $("<button>");
      $(td).append(nextBtn);
      $(nextBtn)
        .val("Next Month")
        .addClass("next-btn")
        .attr("title", "skip to next month")
        .attr("data-placement", "right")
        .attr("data-toggle", "tooltip")
        .append(">>")
        .click(function () {
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
      tr = $("<tr>");
      $(thead).append(tr);
      for (const elem of this.dayNames) {
        let th = $("<th>");
        $(tr).append(th);
        $(th).text(elem);
        if (elem == "Sunday" || elem == "Saturday") {
          $(th).addClass("weekend");
        }
      }

      //
      //
      //  Table Body  //
      //
      //
      var tbody = $("<tbody>");
      $(table).append(tbody);
      tr = $("<tr>");
      $(tbody).append(tr);
      // loop from 0 until the first day of the month (Sunday, until the day of the week of the first day of the month)
      // create an empty table cell for each blank day
      for (let i = 0; i < days[0].getDay(); i++) {
        td = $("<td>");
        $(tr).append(td);
        $(td).text("");
      }
      // for each day within the month, create a table cell containing the date
      for (let i = 0; i < days.length; i++) {
        // if this day is a Sunday, end the previous week table row, and start a new row
        if (days[i].getDay() == 0) {
          tr = $("<tr>");
          $(tbody).append(tr);
        }
        // create a table cell with the CSS class "day", and the text value of the day of the month
        td = $("<td>");
        $(tr).append(td);
        $(td).addClass("day");
        $(td).text(days[i].getDate());

        let today = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        if (
          days[i].getDate() === today &&
          displayDate.getMonth() === month &&
          displayDate.getFullYear() === year
        ) {
          $(td).addClass("today");
        }
      }

      // last week of month empty cells to fill the week
      // create an empty table cell for each blank day
      for (let i = days.at(-1).getDay() + 1; i < 7; i++) {
        td = $("<td>");
        $(tr).append(td);
      }

      // output the calendar to the HTML element
      this.elem.append("");
    };
  }

  // declare an instance of Calendar
  const cal = new Calendar(calendar);

  // call the display() method
  cal.display();

  //
  //
  //  HTML Form Validations
  //
  //

  //Input Validation/Error feedback
  $("#input-progress").validate({
    rules: {
      //Date Rules
      eventdate: {
        required: true,
        minlength: 10,
        maxlength: 10,
      },
      //Title Rules
      eventtitle: {
        required: true,
        minlength: 3,
      },
    },
    messages: {
      //Date Messages
      eventdate: {
        required: "Please enter the date",
        minlength: "The date must be in (mm/dd/yyyy) format",
        maxlength:
          "Too many characters. Make sure you are using (mm/dd/yyyy) format",
      },
      //Title Messages
      eventtitle: {
        required: "Please enter the title",
        minlength: "Your title must contain at least 3 characters",
      },
    },
  });

  //Check date format/validity function
  // Taken and adapted from Elian Ebbing stackoverflow.com
  checkDate = function (eventdate) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(eventdate)) return false;

    // Parse the date parts to integers
    var parts = eventdate.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  //Event Title Minimum Length Function
  checkTitle = function () {
    if (eventtitle.value.length >= 3) {
      return true;
    } else {
      return false;
    }
  };

  const events = [];
  //Submit Button
  $("#submit").click(function () {
    if (
      checkDate(eventdate.value) === true &&
      checkTitle(eventtitle.value) === true
    ) {
      alert("success!");
      events.push(
        `Event Date: ${eventdate.value}`,
        `Event Title: ${eventtitle.value}`,
        `Event Description: ${eventdescription.value}`
      );
      console.log(events);
      $("form").get(0).reset();
    } else {
      alert("Something is wrong!");
      $("form").get(0).reset();
    }
  });

  //Clear Button
  $("#clear").click(function () {
    $("form").get(0).reset();
  });

  //
  //
  //  BootStrapify #1 & 2 ---3rd is Modal, done in HTML Form
  //
  //

  //
  //  Tooltips
  //
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $('[data-toggle="tooltip"]').on("click", function () {
    $(this).tooltip("hide");
  });

  //
  // Progress Bar (Mazharul Islam)
  //
  function updateInputProgress() {
    var filledFields = 0;
    $("#input-progress")
      .find("input, select, textarea")
      .each(function () {
        if ($(this).val() != "") {
          filledFields++;
        }
      });

    var percent = Math.ceil((100 * filledFields) / totalFields);
    $("#progress-inputs .progress-bar")
      .attr("aria-valuenow", percent)
      .width(percent + "%")
      .find(".sr-only")
      .html(percent + "% Complete");

    return percent;
  }

  //Input Progress
  var totalFields = $("#input-progress").find("input, select, textarea").length;
  $("#input-progress").click(function () {
    updateInputProgress();
  });
  $("#input-progress .btn-success").click(function () {
    var percent = updateInputProgress();
    if (percent == 100) {
      alert("Finished inputs successfully!");
    }
  });
});

var myDate = Date.now();
console.log(myDate);
