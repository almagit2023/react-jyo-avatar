import React, { useState } from 'react';
import '../App.css';
import Axios from 'axios';

const Avatar = () => {

  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(1000);

  // Function to set the current sprite type

  function handleSprite(spritetype) {
    setSprite(spritetype);
  }


  function handleGenerate() {
    let x = Math.floor(Math.random() * 1000);
    setSeed(x);
    console.log("Next clicked")
  }

  // Function to download inage and save it in our computer
  function downloadImage() {
    Axios({
      method: "get",
      url: `https://avatars.dicebear.com/api/${sprite}/${seed}}.svg`,
      responseType: 'arraybuffer'
    })
      .then((response) => {
        var link = document.createElement("a");

        link.href = window.URL.createObjectURL(
          new Blob([response.data],
            {
              type: "application/octet-stream"
            })
        );

        link.download = `${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => { });
  }

  return (
    <div className="container">
      <div className="nav">
        <p>Random Avatar Generator</p>
      </div>
      <div className="home">
        <div className="btns">
          <button className='btn' onClick={() => handleSprite('avataaars')}>Human</button>
          <button className='btn' onClick={() => handleSprite('human')}>Pixel</button>
          <button className='btn' onClick={() => handleSprite('bottts')}>Bots</button>
          <button className='btn' onClick={() => handleSprite('jdenticon')}>Vector</button>
          <button className='btn' onClick={() => handleSprite('identicon')}>Identi</button>
          <button className='btn' onClick={() => handleSprite('gridy')}>Alien</button>
          <button className='btn' onClick={() => handleSprite('micah')}>Avatars</button>
        </div>
        <div className="avatar">
          <img src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`} alt="Sprite" />
          <div className="generate">
            <button id="gen" className='btn btn-Next'  onClick={() =>handleGenerate()}>Next</button>
            <button id="down" className='btn btn-Download' onClick={() => downloadImage()} >Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Avatar;