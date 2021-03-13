import React, { Component } from 'react'
import firebase from './firebase'
export class Fire extends Component {

    constructor(props){

        super(props)
        this.state={
            words:[]
        }
    }
   componentDidMount(){
     const wordRef = firebase.database().ref('words');
     wordRef.on('value', (snapshot) =>{
      let words=snapshot.val()
      let newState=[]
      for(let word in words){
          newState.push({
              id:word,
              word:words[word].word,
              meaning:words[word].meaning
          })
      }
      this.setState({

        words:newState
      })


     })


   }

    render() {
        return (
            <div>
                {this.state.words.map((word)=>{

                  return(
                   <div>
                    <h3>{word.word}</h3>
                    {/* <p>{word.meaning}</p> */}

                   </div> 
                  )

                }
                
                
                )}
            </div>
        )
    }
}

export default Fire




