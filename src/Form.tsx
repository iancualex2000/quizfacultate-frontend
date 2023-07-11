import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getQuestions, questionType, resetState } from "./features/questionSlice";
import { Typography ,Radio,RadioGroup,FormControl,FormControlLabel,FormLabel, Container,Button,Box} from "@mui/material";
import { AppDispatch, RootState } from "./store";
import { Spinner } from "./Spinner";




const CustomRadio = ({value,answer,handleChange}: {value: string,answer:string,handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
    
    return(
        <Box sx={{marginTop: '20px'}}>
        <label><input type="radio" name="quiz" value={value} onChange={handleChange}/>{value+") " + answer}</label>
        </Box>
    )
}

export const Form = () => {
    const dispatch: AppDispatch = useDispatch();

    const {questions,questionsIsLoading,questionsIsSuccess,questionsIsError,questionsMessage} = useSelector((state: RootState) => state.questions);
    
    const [activeQuestion, setActiveQuestion] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [correctAnswers,setCorrectAnswers] = useState(0);
    const [wrongAnswers,setWrongAnswers] = useState(0);
    const [correct,setCorrect] = useState(false);
    const [wrong,setWrong] = useState(false);
    const [submited,setSubmited] = useState(false);

    const [intrebari,setIntrebari] = useState<questionType[]>([{
        "question": '',
        "questionNumber": '',
        "a": '',
        "b": '',
        "c": '',
        "d": '',
        "answer": ''
    }]);



    
  
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(event.target.value);
      };    

    const onClickNext = () => {
        setSubmited(false);
        setWrong(false);
        setSelectedAnswer('');
        console.log(selectedAnswer)
        setActiveQuestion((prev) => prev + 1);

    }

    const onClickConfirm = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(selectedAnswer)
        if(questions[activeQuestion].answer === selectedAnswer){
            setCorrectAnswers((prev) => prev+1);

        }else{
            setWrongAnswers((prev) => prev+1);
            setWrong(true)
        }
        setSubmited(true);
    }
    const onClickBack = () => {
        setActiveQuestion((prev) => prev - 1)
    }

    // const onAnswerSelected = (answer) => {
    //     if (answer === correctAnswer) {
    //       setSelectedAnswer(true)
    //       console.log('right')
    //     } else {
    //       setSelectedAnswer(false)
    //       console.log('wrong')
    //     }
    // }

    const shouldRender = useRef(true);

   
    useEffect(() => {
        if(questionsIsError){
            console.log(questionsMessage);
            dispatch(resetState());
        }
        if(questionsIsSuccess){
            dispatch(resetState());
        }
    }, [questionsIsError,questionsIsLoading,questionsIsSuccess])

    


 

    
    return(
        <>
        <Container maxWidth='sm'>
           {
                questionsIsLoading ? <Spinner/>
                :
            <>
                    <Box sx={{display: 'flex', flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Typography sx={{fontSize: '15px'}}>{activeQuestion+ " / " + questions.length}</Typography>
                        <Typography sx={{fontSize: '15px', color: "green"}}>Correct: {correctAnswers}</Typography>
                        <Typography sx={{fontSize: '15px', color: "red"}}>Wrong: {wrongAnswers}</Typography>
                        
                    </Box>
                    <Box>
            
                        <Typography sx={{marginTop: '20px',marginBottom: '15px',fontWeight: "bold"}}>{questions[activeQuestion].question}</Typography>
                    </Box>
                <form onSubmit={onClickConfirm}>
                    <Box sx={{display: 'flex',flexDirection: 'column', height: '350px'}}>
                        <CustomRadio value="a" answer={questions[activeQuestion].a} handleChange={handleChange}/>
                        <CustomRadio value="b" answer={questions[activeQuestion].b} handleChange={handleChange}/>
                        <CustomRadio value="c" answer={questions[activeQuestion].c} handleChange={handleChange}/>
                        <CustomRadio value="d" answer={questions[activeQuestion].d} handleChange={handleChange}/>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: 'space-evenly', marginTop: '20px'}}>
                        <Button variant='outlined' onClick={onClickBack}>Back</Button>
                        {submited && <Button variant="contained" onClick={onClickNext}>Next</Button>}
                        {!submited && <Button variant='contained' type="submit">Confirm</Button>}
                    </Box>

                </form>
                <Box sx={{margin: "20px"}}>
                    <Typography>{wrong ? `Wrong ma pula, raspunsu corect ii ${questions[activeQuestion].answer}` : ""}</Typography>
                </Box>
            </>
           }
           
           
            
        </Container>
       
        </>
    )
}