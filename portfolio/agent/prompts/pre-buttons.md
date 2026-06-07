now for button 3 kinds of buttons : 
1. PairButton : it is a type of button which is always paired with anoter button .{
design: .button {
  position: relative;
  overflow: hidden;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #3d3a4e;
  background-size: 400%;
  color: #fff;
  border: none;
  cursor: pointer;
}

.button:hover::before {
  transform: scaleX(1);
}

.button-content {
  position: relative;
  z-index: 1;
}

.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background: linear-gradient(
    82.3deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  );
  transition: all 0.475s;
}
also the above button has the animation from left to right , i need it to happen from centre to corners . --major change .

i need you to redesign this button  to exactly balck and white theme but with same transitions and the color of the button can be set as black with white radius or the white with black one from the place of declaration }
2.SoloButton : single button design {
.button {
  display: flex;
}

.box {
  width: 35px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  transition: all .8s;
  cursor: pointer;
  position: relative;
  background: rgb(58, 165, 253);
  overflow: hidden;
}

.box:before {
  content: "W";
  position: absolute;
  top: 0;
  background: #0f0f0f;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
  transition: transform .4s;
}

.box:nth-child(2)::before {
  transform: translateY(-100%);
  content: 'O';
}

.box:nth-child(3)::before {
  content: 'R';
}

.box:nth-child(4)::before {
  transform: translateY(-100%);
  content: 'L';
}

.box:nth-child(5)::before {
  content: 'D';
}

.button:hover .box:before {
  transform: translateY(0);
}
as it has the hover to world transition same one for but the number of chaacters might change of initial & final world so be careful with describing it }
logoButton - button with logo design {
.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #34974d;
  background-color: #3aa856;
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(30px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #34974d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button .svg {
  width: 30px;
  stroke: #fff;
}

.button:hover {
  background: #34974d;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #2e8644;
}

.button:active {
  border: 1px solid #2e8644;
}i couldnt understand if it works with logo from library or we have to use svg for it .}
I need you you to tell me what is the best way to build logobutton before going to the prompt for these buttons .