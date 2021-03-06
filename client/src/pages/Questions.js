import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_QUESTIONS } from "../utils/queries";

const Questions = () => {
  const { data } = useQuery(QUERY_QUESTIONS);
  const questions = data?.questions || [];

  if (!questions.length) {
    return <p>No questions have been asked yet!</p>;
  }

  return (
    <div className="questionText flex flex-wrap justify-evenly content-start  rounded-2xl bg-white">
      {questions &&
        questions.map((question) => (
          <div
            className="flex items-center p-2 w-1/3 mx-3 my-10 border-solid border-2 border-black rounded-lg drop-shadow-2xl"
            key={question._id}
          >
            <Link
              to={{
                pathname: `/question/${question._id}`,
              }}
            >
              <p className="text-left text-xl mb-2 font-semibold">{question.title}</p>
              <p className="text-left text-sm font-medium">
                Votes: {question.voteA + question.voteB}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Questions;
