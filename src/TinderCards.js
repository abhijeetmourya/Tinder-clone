import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';
import axios from './axios';

function TinderCards() {
  const [people, setPeople] = useState([
    {
    name:"Elon Musk",
    imagurl:"data:image/jpeg;base64,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",
    },
    
    {
    name:"Jeff Bezos",
    imagurl:"https://specials-images.forbesimg.com/imageserve/5f469ea85cc82fc8d6083f05/960x0.jpg?fit=scale",
    },
    
  ]);



  const swiped = (direction, nameToDelete) => {
      console.log("removing:" + nameToDelete);
  };

  const outOfframe = (name) => {
      console.log(name + "left the screen!");
  };

    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
                {people.map((person) => (
                <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfframe(person.name)}
                >
                    <div
                    style = {{backgroundImage: `url(${person.imagurl})`}}
                    className="card"
                    >
                        <h3>{person.name}</h3>
                    </div> 
                </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards
