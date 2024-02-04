/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify'

export const ConfirmPassKeyModal = ({ openPassKey, setOpenPasskey, passkey, setPassKey, setOpenConfirmModal }: any) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "calc(100% - 64px)",
        maxWidth: "600px",
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: "10px",
        p: "24px",
    };

    const handleConfirmPassKey = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (passkey === "") {
            toast.error("Pass key is required")
            return
        }

        if (passkey !== "fashiontravelFod123") {
            toast.error("Invalid pass key")
            console.log(passkey)
            return
        }
        setOpenPasskey(false)
        setOpenConfirmModal(true)
        setPassKey("")
    }


    return (
        <Modal
            open={openPassKey}
            onClose={() => setOpenPasskey(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={openPassKey}
            >
                <Box sx={style} >

                    <form
                        onSubmit={handleConfirmPassKey}
                        className="flex flex-col items-center gap-6">
                        <div className="">
                            <InformationCircleIcon className="w-16 h-16 text-orange-400" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-2xl font-semibold text-[#000000] text-center">
                                Confirm Pass Key
                            </h4>
                            <p className="text-base font-medium text-[#4b5563] text-center">
                                Please confirm your pass key to proceed
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <TextField
                                id="passkey"
                                label="Pass Key"
                                variant="outlined"
                                value={passkey}
                                onChange={(e) => setPassKey(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="w-32 px-6 py-3 rounded-lg bg-[rgba(0,109,156,0.86)] text-white font-semibold text-center transition duration-300 ease-in-out hover:bg-[#006d9c]"
                            >
                                Confirm
                            </button>
                            <button
                               type="button"
                                onClick={() => setOpenPasskey(false)}
                                className="w-32 px-6 py-3 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold text-center transition duration-300 ease-in-out hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Box>
            </Fade >
        </Modal >

    )
}

