import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import questionsService from "./questionService";

export type questionType ={
    question: string,
    questionNumber: string,
    a: string,
    b: string,
    c: string,
    d: string,
    answer: string
}

interface initialStateType {
    questions: questionType[],
    questionsIsError: boolean,
    questionsIsSuccess: boolean,
    questionsIsLoading: boolean,
    questionsMessage: any
}

const initialState: initialStateType = {
    questions: [],
    questionsIsError: false,
    questionsIsSuccess: false,
    questionsIsLoading: false,
    questionsMessage: ""

}


export const getQuestions = createAsyncThunk(
     'questions/getQuestions',
     async (_,thunkAPI) => {
        try{
            const response = await questionsService.getQuestions();
            if(response){
                return response;
            }
            throw new Error("Unable to get questions");
        }catch(err: any){
            const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
            return thunkAPI.rejectWithValue(message);
        }
     }
);


export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        resetState: (state) => {
            state.questionsIsLoading = false;
            state.questionsIsError = false;
            state.questionsIsSuccess =false;
            state.questionsMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getQuestions.pending, (state) => {
            state.questionsIsLoading = true;
        })
        .addCase(getQuestions.fulfilled, (state,action) => {
            state.questionsIsLoading = false;
            state.questionsIsSuccess = true;
            state.questions = [...action.payload];
        })
        .addCase(getQuestions.rejected, (state,action) => {
            state.questionsIsLoading = false;
            state.questionsIsError = true;
            state.questionsMessage = action.payload
        })
    }
});

export const {resetState} = questionsSlice.actions;

export default questionsSlice.reducer;