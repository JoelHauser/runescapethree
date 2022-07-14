import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION, QUERY_ME } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';
import Auth from '../utils/auth';
import VoteResponse from '../components/VoteResponse';
import VoteTake from '../components/VoteTake';

const SingleQuestionView = () => {
    const { id: questionId } = useParams();
    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });
    
    const { id: voteId } = useParams();
    const question = data?.question || {};

    const [addVoteB] = useMutation(ADD_VOTE, {
        variables: {
            voteType: 'voteA',
            questionId: voteId,
        },
    });

    const [addVoteA] = useMutation(ADD_VOTE, {
        variables: {
            voteType: 'voteB',
            questionId: voteId,
        },
    });

    const [view, setView] = useState(false);
    const clickHandlerA = () => {
        addVoteA()
        setView(true);
    }

    const clickHandlerB = () => {
        addVoteB()
        setView(true);
    }

    

    const { data: userData } = useQuery(QUERY_ME);

    

    

    let percentageA = Math.round (question.voteB / (question.voteA + question.voteB) * 100 );
    
    if (percentageA < 0) {
        percentageA = 0
    } else if  (percentageA > 100) {
        percentageA = 100
    }
    let percentageB = (100 - percentageA) 
    const ratioWidth = (percentageA * 5);
    // let totalVotes = (question.voteA + question.voteB)

    if (loading) {
        return <div>Loading...</div>
    }


    
    

    return(
        <div>
            
            <h2>{question.title}</h2>
            <p>{question.questionText}</p>
            <div>
                <p>{percentageA}% chose answer {question.answerA}. {percentageB}% chose {question.answerB}.</p>
                <div className="barContainer">
                    <div className="bg-gray-500 ratioBar"><span className="resultPercent float-right percentageB text-5xl">{percentageB}</span>
                        <div className="bg-blue-600 text-5xl text-blue-100 text-center ratioBar ratioBarFull" style={{width:ratioWidth}}><span className="percentageA resultPercent float-left">{percentageA}</span></div>
                    </div>
                </div>
            </div>
                
            {Auth.loggedIn() ? (
                
                <div>
                {!view && (
                    <div>
                        <button
                            onClick={() => {
                                clickHandlerA()
                            }}
                        >{question.answerA}
                        </button>
                        <button
                            onClick={() => {
                                clickHandlerB()
                            }}
                        >{question.answerB}
                        </button>
                    </div>
                )}
                <div>
                    {view && (
                        <div>
                            
                        Thanks for voting!
                    </div>
                    )}
                </div>
                </div>
            ) : (

                <p>Log in or sign up to cast your vote!</p>
            )}
            
        </div>
    )
};

export default SingleQuestionView;