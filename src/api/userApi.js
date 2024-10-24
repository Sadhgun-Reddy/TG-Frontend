import axios from "axios";

const rootUrl = "http://localhost:3001/v1/";
const loginUrl = `${rootUrl}user/login`;
const userProfileUrl = `${rootUrl}user`;
const logoutUrl = `${rootUrl}user/logout`;
const newAccessJWT = `${rootUrl}tokens`;
const userVerificationUrl = `${userProfileUrl}/verify`;

export const userRegistration = async (frmData) => {
    try {
        const res = await axios.post(userProfileUrl, frmData);
        if (res.data.status !== "success") {
            throw new Error("Registration failed");
        }
        return res.data;
    } catch (error) {
        console.error("Error in userRegistration:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};

export const userRegistrationVerification = async (frmData) => {
    try {
        const res = await axios.patch(userVerificationUrl, frmData);
        if (res.data.status !== "success") {
            throw new Error("Verification failed");
        }
        return res.data;
    } catch (error) {
        console.error("Error in userRegistrationVerification:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};

export const userLogin = async (frmData) => {
    try {
        const res = await axios.post(loginUrl, frmData);
        if (res.data.status === "success") {
            sessionStorage.setItem("accessJWT", res.data.accessJWT);
            localStorage.setItem("crmSite", JSON.stringify({ refreshJWT: res.data.refreshJWT }));
        } else {
            throw new Error("Login failed");
        }
        return res.data;
    } catch (error) {
        console.error("Error in userLogin:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};

export const fetchUser = async () => {
    const accessJWT = sessionStorage.getItem("accessJWT");
    if (!accessJWT) {
        throw new Error("Token not found!");
    }

    try {
        const res = await axios.get(userProfileUrl, {
            headers: { Authorization: accessJWT },
        });
        return res.data;
    } catch (error) {
        console.error("Error in fetchUser:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};

export const fetchNewAccessJWT = async () => {
    const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite")) || {};
    if (!refreshJWT) {
        throw new Error("Token not found!");
    }

    try {
        const res = await axios.get(newAccessJWT, {
            headers: { Authorization: refreshJWT },
        });
        if (res.data.status === "success") {
            sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }
        return true;
    } catch (error) {
        if (error.response?.status === 403) {
            localStorage.removeItem("crmSite");
        }
        console.error("Error in fetchNewAccessJWT:", error);
        throw { status: "error", message: error.response?.data || error.message };
    }
};

export const userLogout = async () => {
    try {
        await axios.delete(logoutUrl, {
            headers: { Authorization: sessionStorage.getItem("accessJWT") },
        });
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("crmSite");
    } catch (error) {
        console.error("Error in userLogout:", error);
    }
};
