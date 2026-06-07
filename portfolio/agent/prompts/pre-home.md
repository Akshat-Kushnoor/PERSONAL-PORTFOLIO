now for designed a home page i will provide html and css code .
html code : describes what must be done in it gridwise and has the actual plan to be included in the prompt 
css code : has the orientation on the page actually needed .

<div class="parent">
    <div class="div1">must have my name AKSHAT KUSHNOOR in different font with the letters in switching with font Mocodo & orbitron .{i need you to understand this div and purify this for prompt must look professional minimal and perfectly in black & white.}</div> 
    <div class="div2">it must have the roles i could work in and must be fetch from  roles.json file and th format is every role has a role title , svg , description .
also specifically include the autoscroll option from left-right</div> 
    <div class="div3">splin scene mentioned already in home current home page </div> 
</div>
    
.parent {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 8px;
}
    
.div1 {
    grid-column: span 3 / span 3;
    grid-row: span 4 / span 4;
}

.div2 {
    grid-column: span 5 / span 5;
    grid-column-start: 1;
    grid-row-start: 5;
}

.div3 {
    grid-column: span 2 / span 2;
    grid-row: span 4 / span 4;
    grid-column-start: 4;
    grid-row-start: 1;
}

divide the div2 in 2 parts 75% & 25% on 25% add the following animation purely in balck & white .
<div class="container">
	<div class="loader"></div>
	<div class="loader"></div>
	<div class="loader"></div>
</div>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  width: 160px;
  height: 100px;
  margin-left: -80px;
  margin-top: -50px;
  border-radius: 5px;
  background: #1e3f57;
  animation: dot1_ 3s cubic-bezier(0.55,0.3,0.24,0.99) infinite;
}

.loader:nth-child(2) {
  z-index: 11;
  width: 150px;
  height: 90px;
  margin-top: -45px;
  margin-left: -75px;
  border-radius: 3px;
  background: #3c517d;
  animation-name: dot2_;
}

.loader:nth-child(3) {
  z-index: 12;
  width: 40px;
  height: 20px;
  margin-top: 50px;
  margin-left: -20px;
  border-radius: 0 0 5px 5px;
  background: #6bb2cd;
  animation-name: dot3_;
}

@keyframes dot1_ {
  3%,97% {
    width: 160px;
    height: 100px;
    margin-top: -50px;
    margin-left: -80px;
  }

  30%,36% {
    width: 80px;
    height: 120px;
    margin-top: -60px;
    margin-left: -40px;
  }

  63%,69% {
    width: 40px;
    height: 80px;
    margin-top: -40px;
    margin-left: -20px;
  }
}

@keyframes dot2_ {
  3%,97% {
    height: 90px;
    width: 150px;
    margin-left: -75px;
    margin-top: -45px;
  }

  30%,36% {
    width: 70px;
    height: 96px;
    margin-left: -35px;
    margin-top: -48px;
  }

  63%,69% {
    width: 32px;
    height: 60px;
    margin-left: -16px;
    margin-top: -30px;
  }
}

@keyframes dot3_ {
  3%,97% {
    height: 20px;
    width: 40px;
    margin-left: -20px;
    margin-top: 50px;
  }

  30%,36% {
    width: 8px;
    height: 8px;
    margin-left: -5px;
    margin-top: 49px;
    border-radius: 8px;
  }

  63%,69% {
    width: 16px;
    height: 4px;
    margin-left: -8px;
    margin-top: -37px;
    border-radius: 10px;
  }
}
        ! alert the design must be in black and white theme only and the div 1 & 2 must also be designed in such a way it runs in modile screens without lag and is perfect .
make the roes section minimal and it must have a border which highlight once the it scrolls to next role .