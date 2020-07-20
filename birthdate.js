var birthdate = {
    birthdate : function(date, holidayIn) {
        this.bdate=date,
        this.bdate.utc(),
        date.utc(),
        this.didStart = new moment(date).subtract(((39*7)+3),'d').utc(), 
        this.didEnd = new moment(date).subtract(((39*7)-4),'d').utc(),
        this.holidaylist=[],
        holidayIn.forEach(h=>{
            var ds = h.didStart();
            var de = h.didEnd();
            var desame = de.isSame(this.bdate);
            var dssame = ds.isSame(this.bdate);

            if ((ds.isBefore(this.bdate) || ds.isSame(this.bdate)) 
            && (de.isAfter(this.bdate)||de.isSame(this.bdate))) {
                this.holidaylist.push(h);
            }
        });
    
        this.test=''
    
    },
    
}