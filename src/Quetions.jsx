import React, { useState } from 'react'
import { data } from './quetions/quetions'

export const Quetions = () => {
    const total = data.length;
    const [que, setQue] = useState(0);
    const [end, setEnd] = useState(false);
    const [answers, setAnswers] = useState(Array(total).fill("")); // store selected answers
    const [marks, setMarks] = useState(0);
    const [rightQ, setRightQ] = useState(0);

    const calculateResults = (updatedAnswers) => {
        let totalMarks = 0;
        let correctCount = 0;

        updatedAnswers.forEach((ans, index) => {
            if (ans === data[index].correctAns) {
                totalMarks += 2;
                correctCount++;
            }
        });

        setMarks(totalMarks);
        setRightQ(correctCount);
    };

    const handlequetion = () => {
        if (que >= data.length - 1) {
            setEnd(true);
            calculateResults(answers);
            return;
        }
        setQue(que + 1);
    };

    const handlePrevQ = () => {
        if (que > 0) {
            setQue(que - 1);
        }
    };

    const mactAns = (option) => {
        const updatedAnswers = [...answers];
        updatedAnswers[que] = option;
        setAnswers(updatedAnswers);
    };

    return (
        <div className='h-[calc(100vh-9rem)] flex justify-center items-center'>
            <div className='flex flex-col justify-between items-center h-[25rem]'>

                <div className='bg-slate-400/12 h-[5rem] w-[45rem] rounded-[0.2rem] mt-5 shadow-lg shadow-gray-800
                        relative flex justify-center items-center text-2xl alegreya-sans-extrabold text-slate-700'>
                    <div className='absolute left-4 text-[1rem]'>Marks : 2</div>
                    {end ? "Quiz Over" : <div>{data[que].quetion}</div>} 
                    <div className='absolute right-4'>{`${que + 1}/${total}`}</div>
                </div>

                <div>
                    {end ? (
                        <div className='text-[1.5rem] flex flex-col justify-center items-center'>
                            <div>{`Total Right Questions: ${rightQ}/${total}`}</div>
                            <div>{`Total Marks: ${marks}`}</div>
                        </div>
                    ) : (
                        data[que].options.map((option, index) => {
                            let bgColor = "bg-slate-950/80";
                            if (answers[que]) {
                                if (option === answers[que]) {
                                    bgColor = option === data[que].correctAns ? "bg-green-600" : "bg-red-500";
                                }
                            }

                            return (
                                <div key={index}>
                                    <div className={`flex justify-between items-center mb-3 text-amber-50 
                                        rounded-[0.2rem] w-[30rem] ${bgColor}`}>
                                        <div className='text-[1.2rem] pl-10'>{option}</div>
                                        <button
                                            className='bg-orange-400 px-4 py-1 rounded-sm cursor-pointer'
                                            onClick={() => mactAns(option)}
                                            disabled={!!answers[que]}
                                        >
                                            check
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className='flex justify-center items-center gap-7'>
                    {que > 0 && (
                        <button className='bg-amber-600 px-[2rem] py-[0.5rem] text-amber-50 rounded-[0.2rem] cursor-pointer transition all active:scale-105'
                            onClick={handlePrevQ}>
                            Previous
                        </button>
                    )}
                    {!end && (
                        <button className='bg-amber-600 px-[2rem] py-[0.5rem] text-amber-50 rounded-[0.2rem] cursor-pointer transition all active:scale-105'
                            onClick={handlequetion}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
