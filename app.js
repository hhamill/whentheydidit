
Vue.createApp({
    data() {
            return {
            info: null,
            loading: true,
            errored: false,
            masterlist:[],
            bindbd:null,
            bd: null,
            ontime:0,
            ontimeoptions: []
            }
    },
    filters() {
        return {
            formatdate(value) {
                var d = moment(value);
                d.utc();
                return d.format("DD-MMM-YYYY");
            },
            abs(value) {
            return Math.abs(value);
            }
        }
    },
    methods() {
        return {
        calculate() {
            if (this.bindbd==null) {
                return;
            } else {
                

                this.bd = new moment(this.bindbd + "T00:00:00Z").utc();
                if (this.ontime!=0) {
                    this.bd.subtract(this.ontime,"w");
                }
            }
            this.loading=true;
            this.masterlist = holidays.holidayList(this.bd.year()-1)
            .concat(holidays.holidayList(this.bd.year()))
            .concat(holidays.holidayList(this.bd.year()+1));
            this.info = new birthdate.birthdate(this.bd,this.masterlist);
            this.loading = false;
        }, resetButton() {
            this.ontime=0;
            this.calculate();
        }
    }
    },
    mounted() {
        for (i = -12; i < 13; i++) {
            if (i==0) {
                this.ontimeoptions.push({text:"on time", value: "0"});
            } else {
               
                this.ontimeoptions.push({text: Math.abs(i).toString() + " " + (Math.abs(i)>1 ? "weeks" : "week") + " " + (i<0 ? "early" : "late"), value: i});
            }
            
           
          }
        this.ontimeoptions
       if (this.bd==null) {
           return;
       }

       this.methods.calculate();
    }
}).mount('#app')