"use client"
import React, {useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {createEmployee} from "@/service/employee/employeeService";
import {useRouter} from "next/navigation";

function Page(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

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


    return (
        <div>

            <div className="bg-slate-700 p-4">
                <p className="text-2xl text-center text-white">Employee Master</p>
            </div>

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
                                    <Button variant="default">Update</Button>
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
        </div>
);
}

export default Page;