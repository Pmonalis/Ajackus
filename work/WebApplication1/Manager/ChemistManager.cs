using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using WebApplication1.Model;

namespace WebApplication1.Manager
{
    public class ChemistManager
    {
        //create method
        // step 1 : call method GetChemist 
        // prepare a list of type Chemist
        // fill the list from the datatable returned from method  GetChemist

        public static List<Chemist.ChemistDetail> GetChemist(int pinCode, int index1 )
        {
            DataTable dt = DataManager.GetChemist(pinCode, index1);

            List<Chemist.ChemistDetail> lstChemist = new List<Chemist.ChemistDetail>();

            foreach (DataRow dr in dt.Rows)
            {
                Chemist.ChemistDetail objChemist = new Chemist.ChemistDetail();

                objChemist.pin_code = Convert.ToInt32(dr["pin_code"]);
                objChemist.chemist_name = dr["chemist_name"].ToString();
                objChemist.phone_no = dr["Phn_no"].ToString();
                objChemist.address = dr["Address"].ToString();
                objChemist.chemist_maxchemist_id = dr["maxchemist_id"].ToString();
                objChemist.chemist_id = dr["id"].ToString();
                lstChemist.Add(objChemist);
            }
            return lstChemist;
        }

        public static void SubmitChemist(string chemistname, string address, int Phnno, int pincode, string cityname)
        {
            DataManager.SubmitData(chemistname, address, Phnno, pincode, cityname);
        }

    }
}