import React from 'react';
import Header from "../components/header";
import Foot from '../components/Foot';

export function Developers() {
  return (
  <div>
    <Header></Header>
    <h1>
      About the Authors:
    </h1>
    <div>
      <img src="download.png"></img>
      <p>
      My name is Martin So and I am currently a third year student in Boston University, I am currently majoring in Psychology and Computer Science. Some of my hobbies include skiing and building model kits.
      </p>
    </div>
    <Foot></Foot>
  </div>
  )
}
