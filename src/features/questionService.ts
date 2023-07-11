import Axios from 'axios';

const API_URL = "http://localhost:5000/getQuestions"

const getQuestions = async () => {
    try{
        const response = await Axios.get(API_URL,{withCredentials: true});
        console.log(response.data)
        return response.data;
    }catch(err){
        console.log(err)
    }
};

const questionsService = {
    getQuestions
};

export default questionsService;