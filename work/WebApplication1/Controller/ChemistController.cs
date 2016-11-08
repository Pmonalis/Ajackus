using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Manager;
using WebApplication1.Model;

namespace WebApplication1.Controller
{
    public class ChemistController : ApiController
    {
        [Route("api/chemistssearch"), HttpGet]
        public IHttpActionResult GetChemist(int pin_code, int index1)
        {
            try
            {
                //authentication

                //request validation

                //if (pin_code == 0)
                //{
                //    return BadRequest();
                //}

                List<Chemist.ChemistDetail> lstChemist = ChemistManager.GetChemist(pin_code, index1);

                string respData = JsonConvert.SerializeObject(lstChemist);

                return Ok(respData);
            }
            catch (Exception ex)
            {
                //logging
                return InternalServerError();
            }
            
            }

        [Route("api/chemistssubmit"), HttpPost]
        public IHttpActionResult submitdata(Chemist.SubmitChemist reqData)
        {
            try
            {
                ChemistManager.SubmitChemist(reqData.chemistname, reqData.address, reqData.Phnno, reqData.pincode, reqData.cityname);
                return Ok();
            }
            catch (Exception ex)
            {
                //logging
                return InternalServerError();
            }
        }
    }
}