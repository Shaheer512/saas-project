import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectionView = () =>{
    return (
        <div>
            <OrganizationList
            afterCreateOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            hidePersonal
            skipInvitationScreen
            />
            
        </div>
    )
}