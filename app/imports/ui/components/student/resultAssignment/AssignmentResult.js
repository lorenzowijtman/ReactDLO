import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import results from "../../../../api/collections/results";

//externe util methode voor het bepalen of een afbeelding weergegeven moet worden in het resultaat
import is_url from "../../../../util/validUrl";

class AssignmentResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      results: {},
      assignment: {}
    };

    this.getAssignment = this.getAssignment.bind(this);
    this.renderBorderColor = this.renderBorderColor.bind(this);
    this.getResults = this.getResults.bind(this);
    this.setList = this.setList.bind(this);
    this.isTrue = this.isTrue.bind(this);
  }
  //haalt het assignment en resultaat object uit de database wanneer het component geladen is
  componentDidMount() {
    this.getAssignment();
    this.getResults();
  }

  //extra check om te kijken of de database objecten correct opgehaald zijn (ivm A-synch)
  componentDidUpdate(prevProps, prevState) {
    const { assignment, results } = this.state;
    if (prevState.assignment !== assignment || prevState.results !== results) {
      if (
        Object.keys(results).length !== 0 &&
        Object.keys(assignment).length !== 0
      ) {
        this.setList();
      }
    }
  }

  //zet het les object in de state
  getAssignment() {
    Meteor.call("assignment.getById", this.props.id, (error, result) => {
      if (error) {
        console.error(error)
        return;
      }
      this.setState({
        assignment: result
      });
    });
  }

  //checkt of ht meegegeven boolean true is (noodzakelijk voor drag&drop)
  isTrue(currentValue) {
    return currentValue.isCorrect === true;
  }

  //vult de lijst in de state met info over de les en resultaten van de leerling
  setList() {
    let list = [];
    const { assignment } = this.state;
    const { results } = this.state;

    for (let i = 0; i < assignment.questions.length; i += 1) {
      list.push({
        questioncount: i + 1,
        question: assignment.questions[i].questions[0],
        correctanswer: "",
        isCorrect: ""
      });

      //extra aanvulling voor afbeelding vraag en video vraag (de vraag heeft een andere route binnen het resultaat object)
      if(assignment.questions[i].questiontype === "picture") {
        list[i].question = assignment.questions[i].questions.img;
      } else if (assignment.questions[i].questiontype === "video") {
        list[i].question = assignment.questions[i].questions.text
      }

      /*switch om het type antwoord te bepalen en de juiste "correcte antwoord" te selecteren
      bepaald ook of de vraag correct beantwoord is, dit is namelijk anders voor multiple choice pictures*/
      switch (assignment.questions[i].answertype) {
        case "Meerkeuze antwoorden":
          for (let j = 0; j < assignment.questions[i].answers.length; j += 1) {
            if (
              assignment.questions[i].answers[j].id ===
              assignment.questions[i].answers[j].correctanswerid
            ) {
              list[i].correctanswer = assignment.questions[i].answers[j].answer;
            }
          }
          list[i].isCorrect = results[0].answers[i].isCorrect;
          break;
        
        case "Meerkeuze plaatje":
        for (let j = 0; j < assignment.questions[i].answers.length; j += 1) {
          if (
            assignment.questions[i].answers[j].id ===
            assignment.questions[i].answers[j].correctanswerid
          ) {
            list[i].correctanswer = assignment.questions[i].answers[j].imageurl;
          }
        }
          list[i].isCorrect =  results[0].answers[0].isCorrect;
          break;

        case "Open vraag":
          list[i].correctanswer = assignment.questions[i].answers[0];
          list[i].isCorrect = results[0].answers[i].isCorrect;
          break;

        case "Sleepvragen":
          let answerString = "";
          for (let j = 0; j < assignment.questions[i].answers.length; j += 1) {
            answerString += assignment.questions[i].answers[j].answer
            answerString += ", "
            }
          
            list[i].correctanswer = answerString;
            
            if(results[0].answers[i].isCorrect.every(this.isTrue)){
              list[i].isCorrect = true;
            } else {
              list[i].isCorrect = false;
            }
            
            break;

        default:
          console.log("case default");
      }
    }
    //update de state met de gevulde lijst
    this.setState({
      list: list
    });
  }

  //methode om de resultaten van de gemaakte les op te halen
  getResults() {
    Meteor.call("results.getByAssignmentId", this.props.id, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      this.setState({
        results: result
      });
    });
  }

  //Bepaald visualisatie voor correct en fout beantwoordde vragen
  renderBorderColor(isCorrect) {
    if (isCorrect) {
      cssClass = "question-block correct-answer";
    } else {
      cssClass = "question-block wrong-answer";
    }

    return cssClass;
  }

  render() {
    //const object dat voor ieder object in de list van de state een element blok aan maakt met info
    const listItems = this.state.list.map(d => (
      
      <div
        key={d.questioncount}
        className={this.renderBorderColor(d.isCorrect)}
      >
        <p>{d.questioncount}</p>
        {console.log(">>>>>>" + d.question)}
        {is_url(d.question) ? (<img className="resultImage" src={d.question} alt="failed to load"/>) : 
        (<p>{d.question}</p>)}
        <p>Juiste antwoord:</p>
        {console.log(">>" + d.correctanswer)}
        {is_url(d.correctanswer) ? (<img className="resultImage" src={d.correctanswer} alt="failed to load"/>) : 
        (<p>{d.correctanswer}</p>)}
      </div>
    ));

    //render die de gemaakte lijst met elementen laat zien en de titel van de les uit het database les object
    return (
      <div className="student-result-assignment">
        <div className="top-container">{this.state.assignment.name}</div>
        <div className="result-assignment-container">{listItems}</div>
      </div>
    );
  }
}

export default AssignmentResult;
