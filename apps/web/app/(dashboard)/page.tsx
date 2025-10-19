"use client"
import { OrganizationSwitcher,UserButton } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button"
import { useMutation,} from "convex/react"
import {api} from "@workspace/backend/_generated/api"


export default function Page() {
  const addUser = useMutation(api.users.add)
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-svh">
     <p className="text-4xl font-bold">AS</p>
     <UserButton/>
     <br />
     <OrganizationSwitcher hidePersonal/>
     <Button onClick={() => addUser()}>Add</Button>
    </div>
    </>
  )
}
