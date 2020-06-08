using System;
using System.ComponentModel.DataAnnotations;

namespace CURDWithJQeryAjaxADONetInMvc_Demo.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public string Office { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        [Display(Name = "Start Date")]
        public DateTime StartDate { get; set; }

        [Required]
        public int Salary { get; set; }
    }
}