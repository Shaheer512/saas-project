"use client"

import { WidgetView } from "@/modules/widget/ui/views/widget-view"
import { use } from "react"

interface Props{
  searchParams: Promise<{
    organizationId:string
  }>
}
 const Page = ({searchParams}:Props) => {
  console.log("searchParams in Page:", searchParams);
  const {organizationId} = use(searchParams)
  console.log("organizationId in Page:", organizationId);
  return (
   <WidgetView organizationId={organizationId}/>
  )
}

export default Page
