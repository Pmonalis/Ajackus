using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Model
{
    public class Chemist
    {
        public class ChemistDetail 
        {
            public string phone_no { get; set; }
            public string chemist_name { get; set; }
            public string address { get; set; }
            public int pin_code { get; set; }
            public string chemist_maxchemist_id { get; set; }
            public string chemist_id { get; set; }
        }

        public class SubmitChemist
        {
            public string chemistname { get; set; }
            public string address { get; set; }
            public int Phnno { get; set; }
            public int pincode { get; set; }
            public string cityname { get; set; }
        }
    }
}                                                          