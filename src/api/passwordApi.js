import axios from "axios";

const rootUrl = "http://localhost:3001/v1/";
const otpReqUrl = `${rootUrl}user/reset-password`;
const updatePassUrl = otpReqUrl;

export const reqPasswordOtp = async (email) => {
    try {
        const { data } = await axios.post(otpReqUrl, { email });
        return data;
    } catch (error) {
        console.error("Error in reqPasswordOtp:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};

export const updateUserPassword = async (passObj) => {
    try {
        const { data } = await axios.patch(updatePassUrl, passObj);
        return data;
    } catch (error) {
        console.error("Error in updateUserPassword:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};
