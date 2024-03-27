/* eslint-disable @typescript-eslint/no-explicit-any */
import { Configuration, EmailsApi, EmailTransactionalMessageData, } from '@elasticemail/elasticemail-client-ts-axios';


const config = new Configuration({
    apiKey: import.meta.env.VITE_ELASTIC_EMAIL_API_KEY
});

const emailsApi = new EmailsApi(config);


export const ConfirmedBookingForPaymentsActivity = async (recipientEmail: string, firstName: string, price: string, bookingId: string, travellers: any, bookingDate: any, checkInDate: any, itemName: string) => {
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
                TemplateName: "Your Booking is Confirmed for bank transfers - Activity",
                Merge: {
                    firstname: firstName,
                    amount: price,
                    bookingid: bookingId,
                    travelling: travellers,
                    bookingdate: bookingDate,
                    checkindate: checkInDate,
                    itemname: itemName,
                },
                From: "ExploreCrystalveey <bookings@crystalveey.com>",
                Subject: "Your Booking is Confirmed!",
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