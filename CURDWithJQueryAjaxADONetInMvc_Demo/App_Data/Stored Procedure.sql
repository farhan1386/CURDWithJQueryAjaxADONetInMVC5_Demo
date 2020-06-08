
create proc GetEmployees
as
begin
	select Id,Name,Position,Office,Age,StartDate,Salary from Employee
end

create proc NewEmployee
(
@Name  nvarchar(50), 
@Position  nvarchar(50), 
@Office  nvarchar(50), 
@Age   int,                                        
@StartDate datetime,                                         
@Salary int                                        
)
as
begin
  INSERT INTO Employee (Name,Position,Office,Age,StartDate,Salary) 
  VALUES (@Name,@Position,@Office,@Age,GETDATE(),@Salary); 
end

create proc UpdateEmployee
(
@Id int, 
@Name  nvarchar(50), 
@Position  nvarchar(50), 
@Office  nvarchar(50), 
@Age   int,                                        
@StartDate datetime,                                         
@Salary int                                        
)
as
begin
	UPDATE Employee
	SET 
	NAME = @Name,
	Position=@Position,
	Office=@Office,
	Age=@Age,
	StartDate=GETDATE(),
	Salary=@Salary
	Where Id=@Id
end

create proc DeleteEmployee
(
@Id int
)
as
begin
  delete from Employee Where Id=@Id
end