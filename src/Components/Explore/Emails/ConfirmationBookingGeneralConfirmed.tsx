/* eslint-disable @typescript-eslint/no-explicit-any */
import { Configuration, EmailsApi, EmailTransactionalMessageData, } from '@elasticemail/elasticemail-client-ts-axios';


const config = new Configuration({
    apiKey: import.meta.env.VITE_ELASTIC_EMAIL_API_KEY
});

const emailsApi = new EmailsApi(config);


export const ConfirmationBookingGeneralConfirmed = async (recipientEmail: string, firstName: string, price: string, bookingId: string, travellers: any, bookingDate: any, startDate: any, endDate: any, itemName: string) => {
    try {
        const emailTransactionalMessageData: EmailTransactionalMessageData = {
            Recipients: {
                To: [recipientEmail],
            },
            Content: {
                Body: [
                    {
                        ContentType: "HTML",
                        Charset: "utf-8",
                        Content: "<strong>Example content<strong>"
                    },
                ],
                TemplateName: "Your Booking is Confirmed",
                Merge: {
                    firstname: firstName,
                    amount: price,
                    bookingid: bookingId,
                    travelling: travellers,
                    bookingdate: bookingDate,
                    startdate: startDate,
                    enddate: endDate,
                    itemname: itemName,
                },
                From: "ExploreCrystalveey <muzardemoses@crystalveey.com>",
                Subject:  `Your Booking is Confirmed!`,
            },
        }

        // Send the transactional email
        const response = await emailsApi.emailsTransactionalPost(emailTransactionalMessageData);
        // console.log('Transactional email sent successfully.');
        console.log(response.data);
    } catch (error) {
        console.error('Error sending transactional email:', error);
        throw error;
    }
}