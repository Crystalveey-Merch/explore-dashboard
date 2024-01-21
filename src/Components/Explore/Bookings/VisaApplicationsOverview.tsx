/* eslint-disable @typescript-eslint/no-explicit-any */
export const VisaApplicationsOverview = ({ visaApplications }: any) => {
    return (
        <div className="hidden">
            {visaApplications.map((visaApplication: any) => (
                <div key={visaApplication.id}>
                </div>
            ))}
        </div>
    )
}