import { ReactNode } from "react"
import { Header, SideBar } from "../Components"


export const DasboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='z-30'>
                <SideBar />
            </div>
            <div className='flex flex-grow overflow-auto'>
                {/* flex-grow or flex-1 */}
                <div className='flex-grow border-r border-r-gray-300 min-h-screen h-max flex flex-col'>
                    <div className='sticky top-0 z-10'>
                        <Header />
                    </div>

                    <div className='flex-grow h-max font-public-sans'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}