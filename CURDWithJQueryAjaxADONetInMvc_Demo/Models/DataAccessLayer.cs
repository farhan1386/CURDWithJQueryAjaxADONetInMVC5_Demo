using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CURDWithJQeryAjaxADONetInMvc_Demo.Models
{
    public class DataAccessLayer
    {
        private readonly string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;

        public List<Employee> GetEmployees()
        {
            List<Employee> employeelist = new List<Employee>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("GetEmployees", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employeelist.Add(new Employee
                    {
                        Id = Convert.ToInt32(rdr["Id"]),
                        Name = rdr["Name"].ToString(),
                        Position = rdr["Position"].ToString(),
                        Office = rdr["Office"].ToString(),
                        Age = Convert.ToInt32(rdr["Age"]),
                        StartDate =Convert.ToDateTime(rdr["StartDate"]),
                        Salary = Convert.ToInt32(rdr["Salary"])

                    });
                }
                return employeelist;
            }
        }

        public int AddNew(Employee employee)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("NewEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                DateTime dateTime = DateTime.Now;
                cmd.Parameters.AddWithValue("@Name", employee.Name);
                cmd.Parameters.AddWithValue("@Position", employee.Position);
                cmd.Parameters.AddWithValue("@Office", employee.Office);
                cmd.Parameters.AddWithValue("@Age", employee.Age);
                cmd.Parameters.AddWithValue("@StartDate", dateTime);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Update(Employee employee)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("UpdateEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.AddWithValue("@Id", employee.Id);
                cmd.Parameters.AddWithValue("@Name", employee.Name);
                cmd.Parameters.AddWithValue("@Position", employee.Position);
                cmd.Parameters.AddWithValue("@Office", employee.Office);
                cmd.Parameters.AddWithValue("@Age", employee.Age);
                cmd.Parameters.AddWithValue("@StartDate", employee.StartDate);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}