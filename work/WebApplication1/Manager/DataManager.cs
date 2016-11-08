using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;


namespace WebApplication1.Manager
{
    public class DataManager
    {
        private static string myConnectionString = ConfigurationManager.ConnectionStrings["dmNetConnect"].ConnectionString;

        public static DataTable GetChemist(int pinCode, int index1)
        {
            DataTable dt = new DataTable();
            using (MySqlConnection myConnection = new MySqlConnection(myConnectionString)) //create a connection
            {
                using (MySqlCommand cmd = new MySqlCommand("sp_searchChemist", myConnection)) // creating a command (we can run the query directly also)
                {
                    cmd.CommandType = CommandType.StoredProcedure; //create a command type
                    cmd.Parameters.AddWithValue("@pinCode", pinCode); //parameter for stored procedure
                    cmd.Parameters.AddWithValue("@index1", index1);

                    //excute the stored procedure
                    MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                    da.Fill(dt);
                    //Dispose the DataTable adapter
                    da.Dispose();
                }
            }
            return dt;
        }

        public static void SubmitData(string chemistname, string address, int Phnno, int pincode, string cityname)
        {
            using (MySqlConnection myConnection = new MySqlConnection(myConnectionString)) //create a connection
            {
                using (MySqlCommand cmd = new MySqlCommand("sp_submit", myConnection)) // creating a command (we can run the query directly also)
                {
                    cmd.CommandType = CommandType.StoredProcedure; //create a command type
                    cmd.Parameters.AddWithValue("@chemistname", chemistname); //parameter for stored procedure
                    cmd.Parameters.AddWithValue("@address", address);
                    cmd.Parameters.AddWithValue("@Phnno", Phnno);
                    cmd.Parameters.AddWithValue("@pincode", pincode);
                    cmd.Parameters.AddWithValue("@cityname", cityname);

                    //excute the stored procedure
                    myConnection.Open();
                    cmd.ExecuteNonQuery();
                    myConnection.Close();
                }
            }
        }
    }
}