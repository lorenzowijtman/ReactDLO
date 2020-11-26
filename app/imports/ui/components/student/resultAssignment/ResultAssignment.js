import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import results from '../../../../api/collections/results';


import './style.scss';

const ResultAssignment = (props) => {
  const testData = [
    {
      questioncount: 'Vraag 1',
      question: 'Welk van de volgende getallen is GEEN priemgetal?',
      youranswer: 'C. 69',
      correctanswer: 'C. 69',
    },
    {
      questioncount: 'Vraag 2',
      question: 'Welk van de volgende getallen is GEEN priemgetal?',
      youranswer: 'C. 69',
      correctanswer: 'B. 3',
    },
    {
      questioncount: 'Vraag 3',
      question: 'Welk van de volgende getallen is GEEN priemgetal?',
      youranswer: 'C. 69',
      correctanswer: 'C. 69',
    },
    {
      questioncount: 'Vraag 4',
      question: 'Welk van de volgende getallen is GEEN priemgetal?',
      youranswer: 'C. 69',
      correctanswer: 'C. 69',
    },
  ];

  let list = [];

  const getAssignment = () => {
    Meteor.call( "assignment.getById", props.id, (error, result) => { 
    if (error) { 
      console.error(error); 
      return; 
    } 
    // console.log(result);
    
    for (let i = 0; i < result.questions.length; i += 1) {
      list.push({questioncount: (i + 1), 
        question: result.questions[i].questions[0], 
        youranswer: "", 
        correctanswer: "",
        isCorrect: false})

        switch(result.questions[i].answertype){

          case "Meerkeuze antwoorden" : 
            for(let j = 0; j < result.questions[i].answers.length; j +=1){
              if(result.questions[i].answers[j].id === result.questions[i].answers[j].correctanswerid){
                list[i].correctanswer = result.questions[i].answers[j].answer;
              }
            } 
            break;

          case "Open vraag" :
            list[i].correctanswer = result.questions[i].answers[0];
            break;

          default :
            console.log("case default");
        }
    
        // console.log(list);
    }

});
Meteor.call( "results.getByAssignmentId", props.id, (error, result) => { 
  if (error) { 
    console.error(error); 
    return; 
  } 
  // console.log(result);
  for (let i = 0; i < result[0].answers.length; i += 1) {
    list[i].isCorrect = result[0].answers[i].isCorrect; 
  }
});

console.log(list);
}

// const assignmentResults = Meteor.call( "results.getByAssignmentId", props.id, (error, result) => { 
//     if (error) { 
//       console.error(error); 
//       return; 
//     } 
//     // console.log(result);
//     for (let i = 0; i < result[0].answers.length; i += 1) {
//       list[i].isCorrect = result[0].answers[i].isCorrect; 
//     }
//   });


  const renderBorderColor = (isCorrect) => {
    let name = ['question-block'];

    if (isCorrect) {
      name.push(' correct-answer');
    } else {
      name.push(' wrong-answer');
    }

    return name.join('');
  };

  // For each loop for looping through testdata and put it in a variable
  const renderQuestions = list.map(data => (
    
    <div
      key={data.questioncount}
      className={renderBorderColor(data.isCorrect)}
    >
      <p>{data.questioncount}</p>
      <p>{data.question}</p>
      <p>Jouw antwoord</p>
      <p>{data.youranswer}</p>
      <p>Juiste antwoord</p>
      <p>{data.correctanswer}</p>
    </div>
  ));

  return (
    <div className="student-result-assignment">
      <div className="top-container">{props.lessonname}</div>
      <div className="result-assignment-container">
      {getAssignment()}
        {renderQuestions}
      </div>
    </div>
  );
};

  
export default ResultAssignment;
