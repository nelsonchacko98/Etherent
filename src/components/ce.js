import React, { Component } from "react";
import { db } from "./Base";

export class Distance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
    };
  }
  componentDidMount() {
    // const wordRef = firebase.collection("messages").document("rpi");
    // console.log(wordRef);
    // wordRef.on("value", (snapshot) => {
    //   let words = snapshot.val();
    //   let newState = [];
    //   for (let word in words) {
    //     newState.push({
    //       //   id: word,
    //       //   word: words[word].word,
    //       //   meaning: words[word].meaning,
    //       date: words[word].date,
    //       message: words[word].message,
    //       distance: word[words].distance,
    //       time: words[word].time,
    //     });
    //   }
    //   this.setState({
    //     words: newState,
    //   });
    // });
    db.collection("messages")
      .doc(this.props.car.Regno)
      .get()
      .then((doc) => {
        const data = doc.data();
        this.setState({ cars: [...this.state.cars, data] }); // LA city object with key-value pair
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.cars.map((car, key) => {
          console.log(car);
          return (
            <div key={key}>
              <p>{car.distance}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Distance;
