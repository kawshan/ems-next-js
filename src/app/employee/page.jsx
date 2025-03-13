"use client"
import React, {useEffect, useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"

import {
    createEmployee,
    deleteEmployeeService,
    listAllEmployees,
    updateEmployeeService
} from "@/service/employee/employeeService";
import {useRouter} from "next/navigation";

function Page(props) {

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [employeeList, setEmployeeList] = useState([]);

    const handelSubmit = (e) => {
        e.preventDefault();
        const employee = {firstName, lastName, email};
        console.log(employee);
        createEmployee(employee).then((response)=>{
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        });
        setFirstName("")
        setLastName("")
        setEmail("")
        router.refresh();
    }



    useEffect(()=>{
        getAllEmployees();
    },[])


    function getAllEmployees(){
        listAllEmployees().then((response)=>{
            console.log(response.status);
            setEmployeeList(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }


    function refillEmployee (employeeOb){
        setFirstName(employeeOb.firstName);
        setLastName(employeeOb.lastName);
        setEmail(employeeOb.email);
        setId(employeeOb.id);
    }


    function updateEmployee(){

        const editEmployee ={firstName,lastName,email}
        console.log(`Edit employee object is ${JSON.stringify(editEmployee)}`);

        updateEmployeeService(id,editEmployee).then((response)=>{
            console.log(`updated data ${response.data}`);
        }).catch(error=>{
            console.log(error);
        });
    }



    async function deleteEmployee(id){
        try {
            await deleteEmployeeService(id);
            alert(`Employee deleted successfully`);
            getAllEmployees();
        }catch (error){
            console.error(`error happened during deleting employee`);
            alert(`error happened during deleting employee`);
            router.refresh()

        }
    }




    return (
        <div>
            {/*header section start*/}
            <div className="bg-slate-700 p-4">
                <p className="text-2xl text-center text-white">Employee Master</p>
            </div>
            {/*header section end*/}

            {/*form section start*/}
            <Card className="w-full">
                <CardTitle>
                    <CardHeader>
                        <CardTitle className="text-center">Create Employee</CardTitle>
                        <CardDescription className="text-center">Deploy your new Employee Into Your System</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            {/*form section start*/}
                            <div className="grid grid-cols-12 gap-4 p-5">

                                <div className="col-span-4">
                                    <Label htmlFor="">First Name</Label>
                                    <Input type="text" name="firstName" value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                </div>

                                <div className="col-span-4">
                                    <Label htmlFor="">Last Name</Label>
                                    <Input type="text" name="lastName" value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                                </div>

                                <div className="col-span-4">
                                    <Label htmlFor="">Email</Label>
                                    <Input type="text" name="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>


                            </div>
                            {/*form section end*/}


                            {/*button row start*/}
                            <div className="grid grid-cols-3 gap-4">

                                <div className="flex justify-start ms-2">
                                    <Button variant="default">Reset</Button>
                                </div>

                                <div className="flex justify-center w-5/12">
                                    <Button variant="default" onClick={updateEmployee}>Update</Button>
                                </div>

                                <div className="flex justify-end me-2">
                                    <Button variant="default" type="submit" onClick={handelSubmit}>Add</Button>
                                </div>


                            </div>
                            {/*button row end*/}

                        </form>
                    </CardContent>
                </CardTitle>
            </Card>
            {/*    form section end*/}


            {/*  employee table start  */}

            <div className="w-full p-5">
            <Card>
                <CardHeader>
                    <CardTitle>Employee Table</CardTitle>
                    <CardDescription>All employees are shown in here</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="bg-slate-700">
                            <TableRow>
                                <TableHead className="text-white text-center">#</TableHead>
                                <TableHead className="text-white text-center">First Name</TableHead>
                                <TableHead className="text-white text-center">Last Name</TableHead>
                                <TableHead className="text-white text-center">Email</TableHead>
                                <TableHead className="text-white text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                employeeList.map((employee,index)=>(
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index=index+1}</TableCell>
                                        <TableCell className="text-center">{employee.firstName}</TableCell>
                                        <TableCell className="text-center">{employee.lastName}</TableCell>
                                        <TableCell className="text-center">{employee.email}</TableCell>
                                        <TableCell className="text-end">
                                        <Button type="button" className="me-2" variant="default" onClick={()=>refillEmployee(employee)}>refill</Button>
                                        <Button type="button" className="me-2" variant="default" onClick={()=>deleteEmployee(employee.id)}>delete</Button>
                                        <Button type="button" className="me-2" variant="default">print</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </div>







            {/*  employee table end  */}


        </div>
);
}

export default Page;