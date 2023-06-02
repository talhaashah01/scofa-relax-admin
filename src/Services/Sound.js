import axios from "axios";
import BASEURL from "../Config/global";
// import { questionModal } from "../Components/CustomModal";


export const fetchData = async (enteries, offset, dateFrom, dateTo, filterSearchValue) => {
    return axios.get(
        `${BASEURL}/api/sounds/?limit=${enteries}&offset=${offset}&start_date=${dateFrom}&end_date=${dateTo}&search=${filterSearchValue}`
    );
}



// export const deleteSound = async (id, name) => {
//     questionModal
//         .fire({
//             title: `Do you want to delete ${name} Sound?`,
//             confirmButtonText: "Yes",
//         })
//         .then((result) => {
//             if (result.isConfirmed) {
//                 // deleteSound(id, name);
//                 return axios.delete(`/api/sounds/${id}`);
//             }
//         });
// };

// export const deleteSound = async (id, name) => {
    
//     try {
//         setLoader(true);
//         const response = await axios.delete(`/api/sounds/${id}`);
//         console.log(response.data)
//         if (response.data.error === false) {
//             successModal.fire({
//                 text: `${name} Sound has been deleted`,
//                 confirmButtonText: "Continue",
//             });
//             setAbc(!abc)
//             setLoader(false);
//         }
//     } catch (error) {
//         console.log("error =======>   ", error);
//         setAbc(!abc)
//         setLoader(false);
//     }
// };
