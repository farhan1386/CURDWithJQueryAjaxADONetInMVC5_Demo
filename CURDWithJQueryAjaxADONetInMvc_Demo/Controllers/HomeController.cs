using CURDWithJQeryAjaxADONetInMvc_Demo.Models;
using System.Web.Mvc;

namespace CURDWithJQeryAjaxADONetInMvc_Demo.Controllers
{
    public class HomeController : Controller
    {
        private readonly DataAccessLayer db = new DataAccessLayer();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(db.GetEmployees(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Employee employee)
        {
            return Json(db.AddNew(employee), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmployeeById(int id)
        {
            var employee = db.GetEmployees().Find(x => x.Id.Equals(id));
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee employee)
        {
            return Json(db.Update(employee), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(db.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
