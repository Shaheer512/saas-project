"use client"
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button"
import { add } from "../../../packages/math/src/add"
import { Input } from "@workspace/ui/components/input"
import { useMutation, useQuery } from "convex/react"
import {api} from "@workspace/backend/_generated/api"


export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)
  return (
    <>
    <Authenticated>
    <div className="flex flex-col items-center justify-center min-h-svh">
     <p>Shaheer Basit</p>
     <UserButton/>
     <Button onClick={() => addUser()}>Add</Button>
     <div className="max-w-sm w-full mx-auto">
     {JSON.stringify(users,null ,2)}
     </div>
    </div>
    </Authenticated>
    <Unauthenticated>
      <p>Must be Signed in!</p>
      <SignInButton>Sign in</SignInButton>
    </Unauthenticated>
    </>
  )
}
