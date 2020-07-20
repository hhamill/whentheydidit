var holidays = {
    holidayList: function (year) {
        var result = [];
        var newYears = new this.holiday();
        newYears.year = year;
        newYears.hdate = new moment(year + "-01-01T00:00:00Z").utc();
        newYears.hdate.utc();
        newYears.name = "New Years Day";
        newYears.description = "A celebration of the first day of the year in the Julian calendar.";
        newYears.key = "newYears";
        result.push(newYears);

        var mlk = new this.holiday();
        mlk.year = year;
        mlk.hdate = this.GetDayOfMonth(new moment(year + "-01-01T00:00:00Z").utc(), 2, 3);
        mlk.name = "Martin Luthor King, Jr. Day";
        mlk.description = "A federal holiday marking the birthday if civil rights leader Martin Luthor King, Jr.";
        mlk.key = "martinluthorkingjrday";
        result.push(mlk);

        var washington = new this.holiday();
        washington.year = year;
        washington.hdate = this.GetDayOfMonth(new moment(year + "-02-01T00:00:00Z").utc(), 2, 3);
        washington.name = "Washington's Birthday (Presidents' Day)";
        washington.description = "Federal holiday comemorating the birth of president George Washington. Some states call it Presidents' day to also honor other presidents, notibly Abraham Lincoln, whose birthday is near by.";
        washington.key = "washingtonsbirthday";
        result.push(washington);


        var easter = new this.holiday();
        easter.year = year;
        easter.hdate = this.Easter(year);
        easter.name = "Easter";
        easter.description = "A Christian holiday commemorating the resurrection of Jesus from the dead.";
        easter.key = "easter";
        result.push(easter);


        var memorial = new this.holiday();
        memorial.year = year;
        memorial.hdate = this.GetDayOfMonth(new moment(year + "-05-01T00:00:00Z").utc(), 2, 5);
        memorial.name = "Memorial Day";
        memorial.description = "A federal holiday comemorating those who have died while serving in the American armed forces.";
        memorial.key = "memorialday";
        result.push(memorial);

        var july4 = new this.holiday();
        july4.year = year;
        july4.hdate = new moment(year + "-07-04T00:00:00Z").utc();
        july4.hdate.utc();
        july4.name = "Independence Day (Fourth of July)";
        july4.description = "Celebrates the anniversary of the adoption of the Declaration of Independance.";
        july4.key = "independenceday";
        result.push(july4);

        var labor = new this.holiday();
        labor.year = year;
        labor.hdate = this.GetDayOfMonth(new moment(year + "-09-01T00:00:00Z").utc(), 2, 1);
        labor.name = "Labor Day";
        labor.description = "A federal holiday celebrating the achievements of American workers, and labor movement.";
        labor.key = "laborday";
        result.push(labor);

        var columbus = new this.holiday();
        columbus.year = year;
        columbus.hdate = this.GetDayOfMonth(new moment(year + "-10-01T00:00:00Z").utc(), 2, 2);
        columbus.name = "Columbus Day";
        columbus.description = "Comemorates the arrival of Columbus in the Americas.";
        columbus.key = "columbusday";
        result.push(columbus);
        
        var halloween = new this.holiday();
        halloween.year = year;
        halloween.hdate = new moment(year + "-10-31T00:00:00Z").utc();
        halloween.hdate.utc();
        halloween.name = "Halloween";
        halloween.description = "Halloween is the evening before the Christian holy days of All Hallows' Day (also known as All Saints' or Hallowmas)";
        halloween.key = "halloween";
        result.push(halloween);


        var veterans = new this.holiday();
        veterans.year = year;
        veterans.hdate = new moment(year + "-11-11T00:00:00Z").utc();
        veterans.hdate.utc();
        veterans.name = "Veterans Day (Armistice Day)";
        veterans.description = "Armistice Day comemorates the signing of the armistice ending World War 1; while in the US, Veterans Day honors all persons who have served in the United States Armed Forces.";
        veterans.key = "veteransday";
        result.push(veterans);

        var thanksgiving = new this.holiday();
        thanksgiving.year = year;
        thanksgiving.hdate = this.GetDayOfMonth(new moment(year + '-11-01T00:00:00Z').utc(), 5, 4);
        thanksgiving.name = "Thanksgiving";
        thanksgiving.description = "An American fall harvest festival, celebrating abundence.";
        thanksgiving.key = "thanksgiving";
        result.push(thanksgiving);
        var christmas = new this.holiday();

        christmas.year = year;
        christmas.hdate = new moment(year + "-12-25T00:00:00Z").utc();
        christmas.hdate.utc();
        christmas.name = "Christmas";
        christmas.description = "A holiday celebrating the birth of Jesus.";
        christmas.key = "christmas";
        result.push(christmas);

        return result;
    },
    GetDayOfMonth: function (inDate, day, weeks) {
        var start = new moment(inDate).utc();
       
        var date = inDate.startOf('month');
        date.utc();
        var x = moment(date);
        var weekDay = x.add((0 - (day)), 'd').day();
        date.add((6 - weekDay), 'd');
        if (weeks > 0) {
            date.add((weeks - 1) * 7, 'd');
        }

        if (date.isAfter(start.add(1, 'M'))) {
            return date.subtract(7, 'd').utc();
        } else { return date; }

    },
    Easter: function (year) {
        var C = Math.floor(year / 100);
        var N = year - 19 * Math.floor(year / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);
        return new moment(year + "-" + this.padout(M) + "-" + this.padout(D) + "T00:00:00Z").utc();
    },
    padout:function(number) { return (number < 10) ? '0' + number : number; },
    holiday: function () {
        this.name = '',
        this.year = 0,
        this.hdate = new moment(),
        this.description = '',
        this.key = ''
        this.hdate.utc();
        this.didStart = function () {
            var x = new moment(this.hdate).utc();
            return x.add(((39 * 7) - 4), 'd');
        },
        this.didEnd = function () {
            var x = new moment(this.hdate).utc();
            return x.add(((39 * 7) + 3), 'd');
        }
    }
}
